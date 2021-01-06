import { join } from 'path';
import { promises as fsPromises } from 'fs';
import { NextFunction, Request, Response } from 'express';

import { UsersDB } from './types';
import { DB_DIRNAME, USER_DB_FILENAME } from '../constants';
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

      await this.sendResponse(res, user);
    } catch (error) {
      console.log(error);
    }
  }

  private async getUserSpaces(username: string) {
    const userDBFilename = join(DB_DIRNAME, `@${username}.json`);
    const result = await fsPromises.readFile(userDBFilename, {encoding: 'utf-8'});
    return JSON.parse(result);
  }

  async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user) return next();

      await this.deleteUserFromUsersDB(req.user.id);
      await this.deleteUserDB(req.user.username);
      await this.sendResponse(res);
    } catch (error) {
      console.log(error);
    }
  }

  private async deleteUserFromUsersDB(userID: number) {
    const usersDB: string = await fsPromises.readFile(USER_DB_FILENAME, {encoding: 'utf-8'});
    const parsedUsersDB: Array<UsersDB> = JSON.parse(usersDB);

    const filteredUserDB = parsedUsersDB.filter((user) => user.id !== userID);
    await fsPromises.writeFile(USER_DB_FILENAME, JSON.stringify(filteredUserDB));
  }

  private async deleteUserDB(username: string) {
    const userDBFilename = join(DB_DIRNAME, `@${username}.json`);
    await fsPromises.unlink(userDBFilename);
  }

  private async sendResponse(res: Response, user?: User) {
    const responseSender: ResponseSender = new ResponseSender(res);
    responseSender.sendSuccessResponse('Success', user);
  }
}
