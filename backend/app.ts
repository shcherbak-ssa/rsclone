import express from 'express';
import { Application, Request, Response } from 'express';

import { ROOT_FILENAME, AVATARS_PATHNAME, AVATARS_DB_DIRNAME } from './constants';
import { BaseRouter } from './routers';
import { responseService } from './services/response.service';

export type AppOptions = {
  port: number,
  hostname: string,
  publicPath: string,
  routers: Array<BaseRouter>,
  middlewares: Array<any>,
};

export class App {
  private app: Application;
  private port: number;
  private hostname: string;

  constructor({
    port, hostname, publicPath, routers, middlewares,
  }: AppOptions) {
    this.app = express();
    this.port = port;
    this.hostname = hostname;

    this.initMiddlewares(middlewares);
    this.initRouters(routers);
    this.initPublic(publicPath);

    this.initInitialRequest();
  }

  static init(appOptions: AppOptions): App {
    return new App(appOptions);
  }

  listen() {
    this.app.listen(this.port, this.hostname, () => {
      console.log(`Server runs on the http://${this.hostname}:${this.port}/`)
    });
  }

  private initMiddlewares(middlewares: Array<any>) {
    middlewares.forEach((middleware) => this.app.use(middleware));
  }

  private initRouters(routers: Array<BaseRouter>) {
    routers.forEach((router) => {
      this.app.use(router.router);
      router.initRouter();
    });
  }

  private initInitialRequest() {
    this.app.get('*', this.rootGetHandle);
  }

  private rootGetHandle(req: Request, res: Response) {
    responseService.sendSuccessResponseFile(res, ROOT_FILENAME);
  }

  private initPublic(publicPath: string) {
    this.app.use(AVATARS_PATHNAME, express.static(AVATARS_DB_DIRNAME));
    this.app.use(express.static(publicPath));
  }
}
