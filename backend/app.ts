import express from 'express';
import { Application } from 'express';
import { RequestMethods } from '../common/constants';

import { BaseMiddleware } from './middlewares/base.middleware';
import { BaseRouter } from './routes/base.router';
import { StaticService } from './services/static.service';

export type AppOptions = {
  port: number;
  hostname: string;
  routers: Array<BaseRouter>;
  middlewares: Array<any>;
  appMiddlewares: Array<BaseMiddleware>;
};

export class App {
  private application: Application;
  private port: number;
  private hostname: string;

  constructor({
    port, hostname, routers, middlewares, appMiddlewares,
  }: AppOptions) {
    this.application = express();
    this.port = port;
    this.hostname = hostname;

    this.initMiddlewares(middlewares);
    this.initAppMiddlewares(appMiddlewares);
    this.initPublic();
    this.initRouters(routers);
  }

  static init(appOptions: AppOptions): App {
    return new App(appOptions);
  }

  listen() {
    this.application.listen(this.port, this.hostname, () => {
      console.log(`Server runs on the http://${this.hostname}:${this.port}/`);
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
