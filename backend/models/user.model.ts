import { promises as fsPromises } from 'fs';
import { Request, Response } from 'express';

import { DB_DIRNAME, USER_DB_FILENAME } from '../constants';
import { UserDB, UsersDB } from '../db/types';
import { join } from 'path';
import { ResponseSender } from './response.model';

type UserQuery = {
  userID: number;
  userEmail: string;
};

export class UserModel {
  async getUser(req: Request, res: Response) {
    try {
      const userQuery: UserQuery | null = this.getUserQuery(req);
      if (userQuery === null) return res.end();

      await this.validateUser(userQuery);
      
      const user: UserDB = await this.readCurrentUserDB(userQuery.userID);
      await this.sendResponse(user, res);
    } catch (error) {
      console.log(error);
    }
  }

  private getUserQuery(req: Request) {
    if (req.query !== undefined) {
      return {
        userID: parseInt(req.query.id as string),
        userEmail: req.query.email as string,
      }
    } else {
      return null;
    }
  }

  private async validateUser({userID, userEmail}: UserQuery) {
    const usersDB = await this.readUsersDB();
    if (usersDB[userID].email === userEmail) return;

    throw new Error('Invalid user');
  }

  private async readUsersDB(): Promise<Array<UsersDB>> {
    const result: string = await fsPromises.readFile(USER_DB_FILENAME, {encoding: 'utf-8'});
    return JSON.parse(result);
  }

  private async readCurrentUserDB(userID: number): Promise<UserDB> {
    const currentUserDBFilename: string = join(DB_DIRNAME, `user-${userID}.json`);
    const result: string = await fsPromises.readFile(currentUserDBFilename, {encoding: 'utf-8'});
    return JSON.parse(result);
  }

  private async sendResponse(user: UserDB, res: Response) {
    const responseSender: ResponseSender = new ResponseSender(res);
    responseSender.sendSuccessResponse('Success', user);
  }
}
