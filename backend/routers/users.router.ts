import { Request, Router } from 'express';

import { UsersController } from '../controllers/users.controller';
import { RequestPathnames } from '../../common/constants';
import { BaseRouter } from './base.router';

export class UsersRouter implements BaseRouter {
  private router: Router;
  private usersController: UsersController;

  constructor() {
    this.router = Router();
    this.usersController = new UsersController();
  }

  initRouter(): Router {
    return this.router
      .get(
        RequestPathnames.USERS,
        this.getUserHandler.bind(this),
      )
  }

  private async getUserHandler({controllerData}: Request): Promise<void> {
    if (controllerData) {
      await this.usersController.getUser(controllerData);
    }
  }
}
