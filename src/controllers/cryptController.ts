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
const EC = new ErrorController();

export class CryptController {

  public async goEncrypt(req: Request, res: Response, next: NextFunction) {
    try {
      let obj = {
        message: "enc is here"
      }
      new SuccessResponse(EC.errorMessage(EC.success), obj).send(res);
    }
    catch (e: any) {
      ApiError.handle(new BadRequestError(e.message), res);
    }
  }

  public async goDecrypt(req: Request, res: Response, next: NextFunction) {
    try {
      let obj = {
        message: "dec is here"
      }
      new SuccessResponse(EC.errorMessage(EC.success), obj).send(res);
    }
    catch (e: any) {
      ApiError.handle(new BadRequestError(e.message), res);
    }
  }

}