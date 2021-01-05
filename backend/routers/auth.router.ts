import { Request, Response, Router } from "express";

import { BaseRouter } from "./base.router";
import {
  LoginModel,
  RegistrationModel,
  registrationBodySchemaValidator,
  loginBodySchemaValidator,
} from '../models/auth.model';

enum AuthPathnames {
  REGISTRATION = '/registration',
  LOGIN = '/login',
};

export class AuthRouter implements BaseRouter {
  router: Router = Router();

  static init(): AuthRouter {
    return new AuthRouter();
  }

  initRouter() {
    this.router
      .post(
        AuthPathnames.REGISTRATION, registrationBodySchemaValidator, this.registrationRequest,
      )
      .post(
        AuthPathnames.LOGIN, loginBodySchemaValidator, this.loginRequest
      );
  }

  private async registrationRequest(req: Request, res: Response) {
    RegistrationModel.startRegistration(req, res);
  }

  private async loginRequest(req: Request, res: Response) {
    LoginModel.startLogin(req, res);
  }
}
