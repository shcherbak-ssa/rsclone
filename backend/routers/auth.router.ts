import { Router } from "express";
import { BaseRouter } from "./base.router";
import { AUTH_REGEXP_PATHNAME } from "../constants";

export class AuthRouter implements BaseRouter {
  router: Router = Router();
  pathRegExp: RegExp = AUTH_REGEXP_PATHNAME;

  static init(): AuthRouter {
    return new AuthRouter();
  }

  initRouter() {}
}
