import { Response } from 'express';
declare global {
    namespace Express {
        interface Response {
            encryptedSend(payload: { statusCode: number; message: string; data: any }): Response;
        }
    }
}