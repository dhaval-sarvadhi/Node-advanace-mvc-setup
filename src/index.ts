import express, { Application } from 'express';
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import config from './config';
import { initModels } from './models';
import { registerRoutes } from './routes/registerRoutes';
import { ErrorHandler } from './middlewares/ErrorHandler';

dotenv.config();

class App {
  public app: Application;
  public sequelize: Sequelize;
  public port: number | string;

  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.sequelize = new Sequelize(
      config.database,
      config.username,
      config.password,
      {
        host: config.host,
        dialect: 'postgres',
        logging: false,
      }
    );

    this.initializeMiddlewares();
    this.initializeModels();
    this.initializeRoutes();
    this.initializeErrorHandling();
  }

  private initializeMiddlewares() {
    this.app.use(express.json());
  }

  private initializeModels() {
    initModels(this.sequelize);
  }

  private initializeRoutes() {
    registerRoutes(this.app);
  }

  private initializeErrorHandling() {
    this.app.use(ErrorHandler);
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }
}

const app = new App();
app.listen();
