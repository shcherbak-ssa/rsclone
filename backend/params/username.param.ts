import { promises as fsPromises } from 'fs';
import { NextFunction, Request, Response, Router } from 'express';

import { USER_DB_FILENAME } from '../constants';
import { UsersDB } from '../models/types';

const USERNAME_PARAM: string = 'username';

export class UsernameParam {
  static init(router: Router) {
    const usernameParam = new UsernameParam();
    router.param(USERNAME_PARAM, usernameParam.requestParamHandler.bind(usernameParam));
  }

  private async requestParamHandler(
    req: Request, res: Response, next: NextFunction, username: string,
  ) {
    const userID: number | null = this.getUserID(req);
    if (userID === null) return next();

    const usersDB = await this.readUsersDB();
    await this.validateUser(userID, username, usersDB);

    const user: UsersDB | undefined = usersDB.find((user) => user.username === username);
    req.user = user;

    next();
  }

  private getUserID(req: Request) {
    if (req.query !== undefined && req.query.id !== undefined) {
      return parseInt(req.query.id as string)
    } else {
      return null;
    }
  }

  private async validateUser(userID: number, username: string, usersDB: Array<UsersDB>) {
    if (usersDB[userID].username === username) return;
    throw new Error('Invalid user');
  }

  private async readUsersDB(): Promise<Array<UsersDB>> {
    const result: string = await fsPromises.readFile(USER_DB_FILENAME, {encoding: 'utf-8'});
    return JSON.parse(result);
  }
}
