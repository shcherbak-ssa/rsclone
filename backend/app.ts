import express from 'express';
import { Application } from 'express';

import { BaseRouter } from './routes/base.router';
import { InitialRouter } from './routes/initial.router';
import { MiddlewareController } from './controllers/middleware.controller';

export type AppOptions = {
  port: number,
  hostname: string,
  publicPath: string,
  routers: Array<BaseRouter>,
  middlewares: Array<any>,
  middlewareControllers: Array<MiddlewareController>,
};

export class App {
  private application: Application;
  private port: number;
  private hostname: string;

  constructor({
    port, hostname, publicPath, routers, middlewares, middlewareControllers,
  }: AppOptions) {
    this.application = express();
    this.port = port;
    this.hostname = hostname;

    InitialRouter.init(this.application, publicPath);

    this.initMiddlewares(middlewares);
    this.initMiddlewareControllers(middlewareControllers);
    this.initPublic(publicPath);
    this.initRouters(routers);
  }

  static init(appOptions: AppOptions) {
    return new App(appOptions);
  }

  listen() {
    this.application.listen(this.port, this.hostname, () => {
      console.log(`Server runs on the http://${this.hostname}:${this.port}/`);
    });
  }

  private initMiddlewares(middlewares: Array<any>) {
    middlewares.forEach((middleware) => this.application.use(middleware));
  }

  private initMiddlewareControllers(middlewareControllers: Array<MiddlewareController>) {
    middlewareControllers.forEach((middlewareController) => {
      this.application.use(
        middlewareController.pathname,
        middlewareController.handler.bind(middlewareController)
      );
    });
  }

  private initRouters(routers: Array<BaseRouter>) {
    routers.forEach((router) => this.application.use(router.initRouter()));
  }

  private initPublic(publicPath: string) {
    this.application.use(express.static(publicPath));
  }
};
