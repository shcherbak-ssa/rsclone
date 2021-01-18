import { Request, Router } from 'express';

import { AvatarsController, AvatarsControllerActions } from '../controllers/avatars.controller';
import { RequestMethods, RequestPathnames } from '../../common/constants';
import { BaseRouter } from './base.router';
import { ControllerData } from '../types/controller.types';

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

  private async routerHanlder({method, controllerData}: Request) {
    if (!controllerData) return;

    switch (method) {
      case RequestMethods.POST:
        return this.createAvatar(controllerData);
    }
  }

  private async createAvatar(controllerData: ControllerData): Promise<void> {
    await this.runAvatarsController(AvatarsControllerActions.CREATE_AVATAR, controllerData);
  }
}
