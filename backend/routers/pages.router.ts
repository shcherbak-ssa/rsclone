import { Request, Router } from 'express';

import { BaseRouter } from './base.router';
import { RequestMethods, RequestPathnames } from '../../common/constants';
import { PagesController, PagesControllerActions } from '../controllers/pages.controller';

export class PagesRouter implements BaseRouter {
  private router: Router;
  private runPagesController: Function;

  constructor() {
    this.router = Router();

    const pagesController: PagesController = new PagesController();
    this.runPagesController = pagesController.runController.bind(pagesController);
  }

  initRouter(): Router {
    return this.router
      .all(RequestPathnames.PAGES, this.routerHanlder.bind(this));
  }

  private async routerHanlder({method, controllerData}: Request): Promise<void> {
    if (!controllerData) return;

    switch (method) {
      case RequestMethods.GET:
        await this.runPagesController(
          PagesControllerActions.GET_PAGES,
          controllerData,
        );
        break;
      case RequestMethods.POST:
        await this.runPagesController(
          PagesControllerActions.CREATE_PAGE,
          controllerData,
        );
        break;
    }
  }
}
