import { Request, Router } from 'express';

import { UsersController, UsersControllerActions } from '../controllers/users.controller';
import { RequestMethods, RequestPathnames } from '../../common/constants';
import { BaseRouter } from './base.router';
import { ControllerData } from '../types/controller.types';

export class UsersRouter implements BaseRouter {
  private router: Router;
  private runUsersController: Function;

  constructor() {
    this.router = Router();

    const usersController: UsersController = new UsersController();
    this.runUsersController = usersController.runController.bind(usersController);
  }

  initRouter(): Router {
    return this.router
      .all(RequestPathnames.USERS, this.routerHanlder.bind(this));
  }

  private async routerHanlder({method, controllerData}: Request) {
    if (!controllerData) return;

    switch (method) {
      case RequestMethods.GET:
        return await this.getUser(controllerData);
      case RequestMethods.PUT:
        return await this.updateUser(controllerData);
      case RequestMethods.DELETE:
        return await this.deleteUser(controllerData);
    }
  }

  private async getUser(controllerData: ControllerData): Promise<void> {
    await this.runUsersController(UsersControllerActions.GET_USER, controllerData);
  }

  private async updateUser(controllerData: ControllerData): Promise<void> {
    await this.runUsersController(UsersControllerActions.UPDATE_USER, controllerData);
  }

  private async deleteUser(controllerData: ControllerData): Promise<void> {
    await this.runUsersController(UsersControllerActions.DELETE_USER, controllerData);
  }
}
