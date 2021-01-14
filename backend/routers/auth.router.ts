import { Request, Response, Router } from 'express';
import { BaseRouter, BaseRouterWorker } from './base.router';

export class AuthRouter extends BaseRouterWorker implements BaseRouter {
  initRouter(): Router {
    return this.router
  }

  private loginHandler(request: Request, response: Response) {}

  private registrationHandler(request: Request, response: Response) {}
}