import { join } from 'path';
import { promises as fsPromises } from 'fs';
import { NextFunction, Request, Response, Router } from 'express';

import { DB_DIRNAME } from '../constants';
import { UserDB } from '../db/types';

const USERNAME_PARAM: string = 'username';

export class UsernameParam {
  static init(router: Router) {
    const usernameParam = new UsernameParam();
    router.param(USERNAME_PARAM, usernameParam.requestParamHandler.bind(usernameParam));
  }

  private async requestParamHandler(
    req: Request, res: Response, next: NextFunction, username: string,
  ) {
    req.user = await this.readCurrentUserDB(username);
    next();
  }

  private async readCurrentUserDB(username: string): Promise<UserDB> {
    const currentUserDBFilename: string = join(DB_DIRNAME, `@${username}.json`);
    const result: string = await fsPromises.readFile(currentUserDBFilename, {encoding: 'utf-8'});
    return JSON.parse(result);
  }
}
