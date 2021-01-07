import { Router } from "express";

import { BaseRouter } from "./base.router";
import { UsernameParam } from '../params/username.param';
import { UserModel } from "../models/user.model";

enum UserPathnames {
  GET_USER = '/@:username/',
  DELETE_USER = '/@:username/settings',
};

export class UserRouter implements BaseRouter {
  router: Router = Router();
  private userModel: UserModel = new UserModel();

  static init(): UserRouter {
    return new UserRouter();
  }

  initRouter() {
    UsernameParam.init(this.router);

    this.router
      .get(
        UserPathnames.GET_USER,
        this.userModel.getUser.bind(this.userModel),
      )
      .delete(
        UserPathnames.DELETE_USER,
        this.userModel.deleteUser.bind(this.userModel),
      );
  }
}