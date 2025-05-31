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
import db from "../models/dbConfig";

const EC = new ErrorController();

export class AdminController {

  public async addAdmin(req: Request, res: Response, next: NextFunction) {
    try {

      // await db.Role.create({
      //   name: "admin"
      // }, { returning: true });

      const { first_name, last_name, role, email, password } = req.body;

      const newAdmin = await db.User.create({
        first_name,
        last_name,
        user_name: first_name + last_name,
        role_id: role || 1,
        email,
        password
      }, { returning: true });

      await db.UserProfile.create({
        user_id: newAdmin.id,
      });

      new SuccessResponse(EC.errorMessage(EC.success), newAdmin).send(res);
    }
    catch (e: any) {
      ApiError.handle(new BadRequestError(e.message), res);
    }
  }

  public async getAllAdmins(req: Request, res: Response, next: NextFunction) {
    try {
      const fetchAdmins = await db.User.findAll({
        include: [{
          model: db.UserProfile,
          as: 'profile'
        }],
        logging: console.log,
      })

      new SuccessResponse(EC.errorMessage(EC.success), fetchAdmins).send(res);
    }
    catch (e: any) {
      ApiError.handle(new BadRequestError(e.message), res);
    }
  }

  public async getAdmin(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id
      const fetchAdminData = await db.User.findOne({
        where: {
          id: id
        },
        include: [{
          model: db.UserProfile,
          as: 'profile'
        }]
      })

      new SuccessResponse(EC.errorMessage(EC.DataFetched), fetchAdminData).send(res);
    }
    catch (e: any) {
      ApiError.handle(new BadRequestError(e.message), res);
    }
  }

}