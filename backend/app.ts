import { join } from 'path';
import express from 'express';
import { Application, Request, Response, NextFunction } from 'express';
import { ROOT_REGEXP_PATHNAME, SUCCESS_STATUS_CODE, ROOT_FILENAME } from './constants';
import { BaseRouter } from './routers';
import { serverConfig } from './server.config';

const sessionCookieOptions = {
  active: true,
};

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
    middlewares.forEach((middleware) => {
      this.app.use(middleware);
    });
  }

  private initRouters(routers: Array<BaseRouter>) {
    this.initRootRequest();

    routers.forEach((router) => {
      this.app.use(router.pathRegExp, router.router);
    });
  }

  private initRootRequest() {
    this.app.get(ROOT_REGEXP_PATHNAME, this.rootGetHandle);
  }

  private rootGetHandle(req: Request, res: Response, next: NextFunction) {
    const sessionCookie = req.cookies.session;
    
    if (sessionCookie && JSON.parse(sessionCookie).active) {
      return next();
    }

    res
      .cookie('session', JSON.stringify(sessionCookieOptions))
      .status(SUCCESS_STATUS_CODE)
      .sendFile(join(serverConfig.publicDirname, ROOT_FILENAME));
  }

  private initPublic(publicPath: string) {
    this.app.use(express.static(publicPath));
  }
}