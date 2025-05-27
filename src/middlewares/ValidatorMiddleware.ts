import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';
import ApiResponse from '../responses/ApiResponse';

export function validateSchema(schema: ZodSchema<any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json(ApiResponse.fail('Validation failed', result.error.errors));
    }
    next();
  };
}

// Example middleware for login validation
import { loginSchema } from '../routes/auth/auth.schema';

export const validateLogin = validateSchema(loginSchema);
