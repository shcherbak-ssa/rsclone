import { join } from 'path';
import { promises as fsPromises } from 'fs';
import { NextFunction, Request, Response } from 'express';

import { DB_DIRNAME, USER_DB_FILENAME } from '../constants';
import { UserDB, UsersDB } from '../db/types';
import { ResponseSender } from './response.model';

type UserQuery = {
  userID: number;
  username: string;
};

export class UserModel {
  async getUser(req: Request, res: Response, next: NextFunction) {
    try {
      const userQuery: UserQuery | null = this.getUserQuery(req);
      if (userQuery === null) return next();

      await this.validateUser(userQuery);
      
      // const user: UserDB = await this.readCurrentUserDB(userQuery.username);
      req.user ? await this.sendResponse(req.user, res) : res.end();
    } catch (error) {
      console.log(error);
    }
  }

  private getUserQuery(req: Request) {
    if (req.query !== undefined && req.query.userID !== undefined) {
      return {
        userID: parseInt(req.query.userID as string),
        username: req.query.username as string,
      }
    } else {
      return null;
    }
  }

  private async validateUser({userID, username}: UserQuery) {
    const usersDB = await this.readUsersDB();
    if (usersDB[userID].username === username) return;

    throw new Error('Invalid user');
  }

  private async readUsersDB(): Promise<Array<UsersDB>> {
    const result: string = await fsPromises.readFile(USER_DB_FILENAME, {encoding: 'utf-8'});
    return JSON.parse(result);
  }

  private async readCurrentUserDB(username: string): Promise<UserDB> {
    const currentUserDBFilename: string = join(DB_DIRNAME, `@${username}.json`);
    const result: string = await fsPromises.readFile(currentUserDBFilename, {encoding: 'utf-8'});
    return JSON.parse(result);
  }

  private async sendResponse(user: UserDB, res: Response) {
    const responseSender: ResponseSender = new ResponseSender(res);
    responseSender.sendSuccessResponse('Success', user);
  }
}
