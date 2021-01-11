import express from 'express';
import { Application } from 'express';

import { BaseMiddleware } from './middlewares/base.middleware';
import { BaseRouter } from './routes/base.router';
import { StaticService } from './services/static.service';

export type AppOptions = {
  port: number;
  hostname: string;
  routers: Array<BaseRouter>;
  middlewares: Array<any | BaseMiddleware>;
};

export class App {
  private application: Application;
  private port: number;
  private hostname: string;

  constructor({
    port, hostname, routers, middlewares,
  }: AppOptions) {
    this.application = express();
    this.port = port;
    this.hostname = hostname;

    this.initMiddlewares(middlewares);
    this.initPublic();
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

  private initMiddlewares(middlewares: Array<any | BaseMiddleware>) {
    middlewares.forEach((middleware) => {
      if ('pathname' in middleware) {
        this.application.use(
          middleware.pathname,
          middleware.handler.bind(middleware),
        );
      } else {
        this.application.use(middleware)
      }
    });
  }

  private initRouters(routers: Array<BaseRouter>) {
    routers.forEach((router) => this.application.use(router.initRouter()));
  }

  private initPublic() {
    this.application.use(express.static(StaticService.publicPath));
  }
};
