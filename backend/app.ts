import express from 'express';
import { Application } from 'express';
import { RequestMethods } from '../common/constants';

import { BaseMiddleware } from './middlewares/base.middleware';
import { BaseRouter } from './routers/base.router';
import { StaticService } from './services/static.service';

export type AppOptions = {
  port: string;
  routers: Array<BaseRouter>;
  middlewares: Array<any>;
  appMiddlewares: Array<BaseMiddleware>;
};

export class App {
  private application: Application;
  private port: number;

  constructor({
    port, routers, middlewares, appMiddlewares,
  }: AppOptions) {
    this.application = express();
    this.port = parseInt(port);

    this.initMiddlewares(middlewares);
    this.initAppMiddlewares(appMiddlewares);
    this.initPublic();
    this.initRouters(routers);
  }

  static init(appOptions: AppOptions): App {
    return new App(appOptions);
  }

  listen() {
    this.application.listen(this.port, () => {
      console.log(`Server runs on port ${this.port}`);
    });
  }

  private initMiddlewares(middlewares: Array<any>): void {
    middlewares.forEach((middleware) => this.application.use(middleware));
  }

  private initAppMiddlewares(appMiddlewares: Array<BaseMiddleware>): void {
    appMiddlewares.forEach((middleware) => {
      const {method, pathname, handler} = middleware;

      switch (method) {
        case RequestMethods.GET:
          this.application.get(pathname, handler.bind(middleware));
          break;
        default:
          this.application.use(pathname, handler.bind(middleware));
      }
    });
  }

  private initRouters(routers: Array<BaseRouter>): void {
    routers.forEach((router) => this.application.use(router.initRouter()));
  }

  private initPublic(): void {
    this.application.use(express.static(StaticService.publicPath));
  }
};
