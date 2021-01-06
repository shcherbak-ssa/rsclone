import { promises as fsPromises } from 'fs';
import { NextFunction, Request, Response } from 'express';
import { Schema, validationResult } from 'express-validator';

import { UsersDB } from './types';
import { USER_DB_FILENAME } from '../constants';
import { ResponseSender } from './response.model';
import { emailValidation, ValidationError } from '../validation';

export const settingsValidationSchema: Schema = {
  email: emailValidation,
};

export class SettingsModel {
  req: Request;
  responseSender: ResponseSender;

  constructor(req: Request, res: Response) {
    this.req = req;
    this.responseSender = new ResponseSender(res);
  }

  static async updateUserData(req: Request, res: Response, next: NextFunction) {
    if (!req.user) return next();

    await new SettingsModel(req, res).updateUserData();
  }

  async updateUserData() {
    try {
      await this.validateBody();

      const requestBody = await this.getRequestBody();
      const user: UsersDB | undefined = this.req.user;

      if (user) {
        const updatedUser = await this.update(user, requestBody);
        await this.saveUpdatedUserToDB(updatedUser);
        await this.responseSender.sendSuccessResponse('success', {...requestBody});
      }
    } catch (error) {
      await this.parseError(error);
    }
  }

  async validateBody() {
    const errors = validationResult(this.req);

    if (!errors.isEmpty()) {
      const {msg: message, param: inputLabel} = errors.array()[0];
      throw new ValidationError(message, {inputLabel});
    }
  }

  async getRequestBody() {
    return this.req.body;
  }

  async update(user: UsersDB, requestBody: any) {
    return {...user, ...requestBody};
  }

  async saveUpdatedUserToDB(updatedUser: UsersDB) {
    const usersDB = await this.readUsersDB();
    usersDB.forEach((user, index, array) => {
      if (user.id === updatedUser.id) {
        array[index] = updatedUser;
      }
    });

    await fsPromises.writeFile(USER_DB_FILENAME, JSON.stringify(usersDB, null, 2));
  }

  async readUsersDB(): Promise<Array<UsersDB>> {
    const result: string = await fsPromises.readFile(USER_DB_FILENAME, {encoding: 'utf-8'});
    return JSON.parse(result);
  }

  async parseError(error: Error) {
    if (error instanceof ValidationError) {
      const {message, payload} = error;
      await this.responseSender.sendErrorResponse(message, payload);
    } else {
      console.log(error);
    }
  }
}
