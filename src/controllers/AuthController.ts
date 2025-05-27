import { Request, Response, NextFunction } from 'express';
import AuthService from '../modules/auth/services/AuthService';
import ApiResponse from '../responses/ApiResponse';

export default class AuthController {
  private authService = new AuthService();

  public async login(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.authService.login(req.body);
      res.json(ApiResponse.success('Login successful', result));
    } catch (error) {
      next(error);
    }
  }
}
