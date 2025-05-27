import { Request, Response, NextFunction } from 'express';
import ApiResponse from '../responses/ApiResponse';

export function ErrorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(err);

  res.status(500).json(ApiResponse.fail(err.message || 'Internal Server Error'));
}
