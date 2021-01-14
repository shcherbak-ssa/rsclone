import { Request, Router } from 'express';

export interface BaseRouter {
  initRouter(): Router;
}

export class BaseRouterWorker {
  protected router: Router;

  constructor() {
    this.router = Router();
  }

  getBody(request: Request): any {
    return request.body;
  }
}
