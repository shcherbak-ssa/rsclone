import { join } from 'path';
import { promises as fsPromises } from 'fs';
import { NextFunction, Request, Response } from 'express';

import { UsersDB } from './types';
import { DB_DIRNAME } from '../constants';
import { ResponseSender } from './response.model';

type User = {
  user: UsersDB,
  spaces: [],
};

export class UserModel {
  async getUser(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user) return next();

      const userDB = await this.getUserSpaces(req.user.username);
      const user: User = {
        user: req.user,
        spaces: userDB.spaces,
      };

      await this.sendResponse(user, res);
    } catch (error) {
      console.log(error);
    }
  }

  private async getUserSpaces(username: string) {
    const userDBFilename = join(DB_DIRNAME, `@${username}.json`);
    const result = await fsPromises.readFile(userDBFilename, {encoding: 'utf-8'});
    return JSON.parse(result);
  }

  private async sendResponse(user: User, res: Response) {
    const responseSender: ResponseSender = new ResponseSender(res);
    responseSender.sendSuccessResponse('Success', user);
  }
}
