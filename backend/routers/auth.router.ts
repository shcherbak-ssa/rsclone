import { Request, Response, Router } from "express";
import { BaseRouter } from "./base.router";
import { AUTH_REGEXP_PATHNAME } from "../constants";
import { registrationBodySchemaValidator, RegistrationModel } from '../models/registration.model';

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
    this.router.post(
      AuthPathnames.REGISTRATION,
      registrationBodySchemaValidator,
      this.registrationRequest
    );

    this.router.post(AuthPathnames.LOGIN, this.loginRequest);
  }

  private async registrationRequest(req: Request, res: Response) {
    RegistrationModel.startRegistration(req, res);
  }

  private async loginRequest() {}
}
