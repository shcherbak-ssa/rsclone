import { Request, Response, Router } from "express";

import { BaseRouter } from "./base.router";
import { UserModel } from "../models/user.model";

enum AppPathnames {
  ROOT = '/app',
};

export class AppRouter implements BaseRouter {
  router: Router = Router();
  private userModel: UserModel = new UserModel();

  static init(): AppRouter {
    return new AppRouter();
  }

  initRouter() {
    this.router.get(AppPathnames.ROOT, this.getUser.bind(this));
  }

  private async getUser(req: Request, res: Response) {
    this.userModel.getUser(req, res);
  }
}
