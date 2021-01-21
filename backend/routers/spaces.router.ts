import { Request, Router } from 'express';

import { RequestMethods, RequestPathnames } from '../../common/constants';
import { BaseRouter } from './base.router';
import { SpacesController, SpacesControllerActions } from '../controllers/spaces.controller';

export class SpacesRouter implements BaseRouter {
  private router: Router;
  private runSpacesController: Function;

  constructor() {
    this.router = Router();

    const spacesController: SpacesController = new SpacesController();
    this.runSpacesController = spacesController.runController.bind(spacesController);
  }

  initRouter(): Router {
    return this.router
      .all(RequestPathnames.SPACES, this.routerHanlder.bind(this));
  }

  private async routerHanlder({method, controllerData}: Request) {
    if (!controllerData) return;

    switch (method) {
      case RequestMethods.POST:
        await this.runSpacesController(
          SpacesControllerActions.CREATE_SPACE,
          controllerData,
        );
        break;
      case RequestMethods.DELETE:
        await this.runSpacesController(
          SpacesControllerActions.DELETE_SPACE,
          controllerData,
        );
        break;
    }
  }
}
