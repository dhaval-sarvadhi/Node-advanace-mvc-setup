import { Request, Response, NextFunction, RequestHandler } from 'express';
import { encrypt, decrypt } from 'crypt-vault';
import { ApiError, BadRequestError } from 'src/core/ApiError';
const isProduction = process.env.NODE_ENV === 'production';

// Extend Response type globally
declare module 'express' {
    interface Response {
        encryptedSend: (payload: {
            statusCode: number;
            message: string;
            data: any;
        }) => void;
    }
}

/**
 * Middleware to decrypt requests (production only)
 */
export const decryptRequest = (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.body.data || typeof req.body.data !== 'string') {
            throw new BadRequestError('Missing encrypted payload');
        }

        const decryptedString = decrypt(req.body.data);
        req.body = JSON.parse(decryptedString); // Replace entire body

        next();
    } catch (error) {
        console.error('❌ Request decryption error:', error);
        next(error); // Pass to error handler
    }
};

/**
 * Middleware to enable encrypted responses
 */

// Create a proper RequestHandler type
export const encryptedResponseHandler: RequestHandler = (req, res, next) => {
    // Add encryptedSend method to response
    (res as any).encryptedSend = function (payload: any) {
        try {
            const response = { ...payload };

            if (isProduction && response.data) {
                response.data = encrypt(JSON.stringify(response.data));
            }

            return this.status(200).json(response);
        } catch (error) {
            return this.status(500).json({
                statusCode: 5000,
                message: 'Encryption failed',
                data: null
            });
        }
    };
    next();
};