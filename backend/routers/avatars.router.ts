import { Request, Router } from 'express';

import { AvatarsController, AvatarsControllerActions } from '../controllers/avatars.controller';
import { RequestMethods, RequestPathnames } from '../../common/constants';
import { BaseRouter } from './base.router';

export class AvatarsRouter implements BaseRouter {
  private router: Router;
  private runAvatarsController: Function;

  constructor() {
    this.router = Router();

    const avatarsController: AvatarsController = new AvatarsController();
    this.runAvatarsController = avatarsController.runController.bind(avatarsController);
  }

  initRouter(): Router {
    return this.router
      .all(RequestPathnames.AVATARS, this.routerHanlder.bind(this));
  }

  private async routerHanlder({method, controllerData, avatarFile}: Request) {
    if (!controllerData) return;

    switch (method) {
      case RequestMethods.GET:
        await this.runAvatarsController(
          AvatarsControllerActions.GET_AVATAR,
          controllerData,
        );
        break;
      case RequestMethods.POST:
        await this.runAvatarsController(
          AvatarsControllerActions.CREATE_AVATAR,
          controllerData,
          avatarFile,
        );
        break;
      case RequestMethods.PUT:
        await this.runAvatarsController(
          AvatarsControllerActions.UPDATE_AVATAR,
          controllerData,
          avatarFile,
        );
        break;
      case RequestMethods.DELETE:
        await this.runAvatarsController(
          AvatarsControllerActions.DELETE_AVATAR,
          controllerData,
        );
        break;
    }
  }
}
