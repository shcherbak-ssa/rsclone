import { Request, Router } from 'express';

import { RequestPathnames } from '../../common/constants';
import { AuthController } from '../controllers/auth.controller';
import { BaseRouter } from './base.router';

export class AuthRouter implements BaseRouter {
  private router: Router;
  private authController: AuthController;

  constructor() {
    this.router = Router();
    this.authController = new AuthController();
  }

  initRouter(): Router {
    return this.router
      .post(
        RequestPathnames.REGISTRATION,
        this.registrationHandler.bind(this),
      )
      .post(
        RequestPathnames.LOGIN,
        this.loginHandler.bind(this),
      );
  }

  private async loginHandler({controllerData}: Request) {
    if (controllerData) {
      await this.authController.loginUser(controllerData);
    }

    // @TODO: add condition
  }

  private async registrationHandler({controllerData}: Request) {
    if (controllerData) {
      await this.authController.createNewUser(controllerData);
    }

    // @TODO: add condition
  }
}
