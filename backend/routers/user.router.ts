import { NextFunction, Request, Response, Router } from "express";

import { BaseRouter } from "./base.router";
import { UsernameParam } from '../params/username.param';
import { UserModel } from "../models/user.model";

enum UserPathnames {
  GET_USER = '/@:username/',
};

export class UserRouter implements BaseRouter {
  router: Router = Router();
  private userModel: UserModel = new UserModel();

  static init(): UserRouter {
    return new UserRouter();
  }

  initRouter() {
    UsernameParam.init(this.router);

    this.router.get(UserPathnames.GET_USER, this.getUser.bind(this));
  }

  private async getUser(req: Request, res: Response, next: NextFunction) {
    this.userModel.getUser(req, res, next);
  }
}
