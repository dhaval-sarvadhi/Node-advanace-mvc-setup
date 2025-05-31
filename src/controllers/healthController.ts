/**
 * @file user.controller.ts
 * @description Controller for managing user-related routes and logic.
 * @author
 * Dhaval Patel
 * @created 2025-05-29
 */

import { NextFunction, Request, Response } from "express";
import { ErrorController } from "../core/ErrorController";
import { SuccessResponse } from '../core/ApiResponse';
import { BadRequestError, ApiError } from '../core/ApiError';
import { decrypt, encrypt } from "crypt-vault";

const EC = new ErrorController();

export class HealthController {

  public async checkHealth(req: Request, res: Response, next: NextFunction) {
    try {

      let str = "its me @ lasan"
      let x = encrypt(JSON.stringify(str));
      console.log('x ===> ', x)

      const decryptedString = decrypt(x);
      console.log('decryptedString', decryptedString)
      new SuccessResponse(EC.errorMessage(EC.success), {}).send(res);
    }
    catch (e: any) {
      ApiError.handle(new BadRequestError(e.message), res);
    }
  }

}
