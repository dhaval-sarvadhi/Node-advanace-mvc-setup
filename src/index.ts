import * as dotenv from 'dotenv';
import express, { Express, Request, Response, NextFunction, RequestHandler } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import * as path from 'path';
import fs from 'fs';
import { encrypt, initializeEncryption } from 'crypt-vault';

import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swaggerConfig';

import { Logger } from './core/Logger';

import { NotFoundError, ApiError, InternalError } from './core/ApiError';
import db, { initializeModels } from './models/dbConfig';

// versions
import { APP_VERSION } from './constants/endPoints';

import { HealthRoute } from './routes/Health/healthRoutes';
import { AdminRoute } from './routes/Admin/adminRoutes';
import { CryptRoute } from './routes/Crypt/CryptRoutes';

import requestHandling from './middlewares/requestHandling';
// import { decryptRequest } from './middlewares/encryption';

dotenv.config();
initializeEncryption(process.env.TERIFF as string, process.env.PLAN as string);

let IS_API_LOG = false;
const isLocalhost = (req: Request) => req.hostname === 'localhost';
export class Server {
    public app: express.Application;
    public router: express.Router;

    constructor() {
        this.app = express();
        this.router = express.Router();

        console.log(`Worker ${process.pid} started`);

        this.initConfigJson(); // Load IS_API_LOG
        this.setupMiddleware();
        this.setupRoutes();
        this.setupSwagger();
        initializeModels()
        this.setupErrorHandlers();
    }

    private initConfigJson() {
        const filePath = path.join(__dirname, '../config.json');
        try {
            if (fs.existsSync(filePath)) {
                let content: any = fs.readFileSync(filePath, 'utf-8');
                content = content.trim() ? JSON.parse(content) : { is_api_log_true: false };
                IS_API_LOG = content.is_api_log_true;
            } else {
                fs.writeFileSync(filePath, JSON.stringify({ is_api_log_true: false }));
                IS_API_LOG = false;
            }
        } catch (err) {
            console.error('Failed to load config.json', err);
        }
    }

    private setupMiddleware() {
        this.app.use(cors({ optionsSuccessStatus: 200 }));
        this.app.use(bodyParser.json({ limit: '100mb' }));
        this.app.use(bodyParser.urlencoded({ extended: true }));
        // this.app.use(expressFileUpload());
        this.app.use(cookieParser('SECRET_GOES_HERE'));

        this.app.set('views', path.join(__dirname, 'views'));
        this.app.set('view engine', 'ejs');
        this.app.use('/', express.static(path.join(__dirname, 'public')));

        // // Middleware with proper typing
        // this.app.use(encryptedResponseHandler as RequestHandler);

        // if (process.env.NODE_ENV === 'production') {
        //     this.app.use(decryptRequest as RequestHandler);
        // }

        this.app.use(requestHandling as RequestHandler);

        this.app.use(async (req: Request, res: Response, next: NextFunction) => {
            try {
                IS_API_LOG = true
                if (IS_API_LOG) {
                    Logger.info(`API Logger middleware Attached:`);
                    const apiLogDetails = await db.ApiLog.create({
                        api_url: req.headers.host + req.originalUrl,
                        method: req.method,
                        request: JSON.stringify(req.body),
                        header: JSON.stringify(req.headers),
                        created_datetime: new Date(),
                    });
                    res.locals.apiLogId = apiLogDetails?.api_log_id;
                }
            } catch (e) {
                console.error('API log middleware error:', e);
            }
            res.header('Access-Control-Allow-Origin', '*');
            res.header(
                'Access-Control-Allow-Headers',
                'Access-Control-Allow-Headers, crossdomain, withcredentials, Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Origin, TokenType',
            );
            res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
            next();
        });

    }

    private setupRoutes() {

        // ? Middleware to encrypt all responses (only apply on routes, not static/files)
        // this.app.use(decryptRequest);       // * Decrypt requests (production only)
        // this.app.use(encryptResponse);      // * Encrypt responses (production only)

        // * API route setup
        new HealthRoute(this.router);
        new AdminRoute(this.router);
        new CryptRoute(this.router);

        this.app.use(APP_VERSION.API_V1, this.router);
        // ? base URL route
        this.app.get('/', (_req: express.Request, res: express.Response, _next: express.NextFunction) => {
            res.send('Dhaval -> Node Setup');
        });
    }

    private setupSwagger() {
        this.app.use(
            '/api-docs',
            swaggerUi.serve,
            swaggerUi.setup(swaggerSpec, {
                customSiteTitle: 'API Documentation',
                customfavIcon: '/assets/img/favicon.ico',
                customCssUrl: '/assets/css/swagger-custom.css',
                customJs: '/assets/js/swagger-custom.js',
            }),
        );
    }

    private setupErrorHandlers() {
        this.app.use((req, res, next) => {
            next(new NotFoundError());
        });

        this.app.use((err, req, res, next) => {
            // ? error handling middleware
            // console.error('Unhandled Error:', err);
            if (err instanceof ApiError) {
                ApiError.handle(err, res);
            } else {
                Logger.error(err);
                if (process.env.NODE_ENV === 'development') {
                    return res.status(500).send(err.message);
                }
                ApiError.handle(new InternalError(), res);
            }

            // return res.status(500).json({
            //     success: false,
            //     message: 'Something went wrong',
            // });
        });

        // this.app.use((err: any, req: Request, res: Response, next: NextFunction) => {
        //     if (err instanceof ApiError) {
        //         ApiError.handle(err, res);
        //     } else {
        //         logger.error(err);
        //         if (process.env.NODE_ENV === 'development') {
        //             return res.status(500).send(err.message);
        //         }
        //         ApiError.handle(new InternalError(), res);
        //     }
        // });
    }

    public start() {
        const port = this.normalizePort(process.env.PORT || 8082);
        console.log(`🌐 Environment: ${process.env.NODE_ENV}`);
        this.app.listen(port, () => {
            Logger.info(`✅ Server started on port ${port}`);
        });
    }

    /**
     * Normalize a port into a number, string, or false.
     */
    public normalizePort(val: string | number): number | string | null {
        const port = parseInt(val as string, 10);

        if (isNaN(port)) {
            // named pipe
            return val;
        }

        if (port >= 0) {
            // port number
            return port;
        }

        return null; // Return null instead of false
    }

    public getApp(): express.Application {
        return this.app;
    }
}

// Initialize and start the server
const server = new Server();
server.start();

export { server };
