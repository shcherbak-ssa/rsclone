import { Application, NextFunction, Request, Response } from 'express';
import { extname, join } from 'path';
import { ResponseSenderService } from 'services/response-sender.service';
import { ResponseFileSender } from 'types/response-sender.types';
import { RequestHeaders, StatusCodes } from '../../common/constants';

const INDEX_FILENAME: string = 'index.html';
const ASSETS_EXTNAME_REGEXP: RegExp = /^.(png|svg|ico)$/;

enum InitialRouterPathnames {
  ROOT = '/',
  REGISTRATION = '/registration',
  LOGIN = '/login',
};

export class InitialRouter {
  application: Application;
  publicPath: string;

  constructor(application: Application, publicPath: string) {
    this.application = application;
    this.publicPath = publicPath;
  }
  
  static init(application: Application, publicPath: string) {
    new InitialRouter(application, publicPath).initRouter();
  }
  
  initRouter() {
    this.application
      .get(
        InitialRouterPathnames.ROOT,
        this.rootRequestHandler.bind(this),
      )
      .post(
        InitialRouterPathnames.REGISTRATION,
      )
      .post(
        InitialRouterPathnames.LOGIN,
      );
  }

  async rootRequestHandler(request: Request, response: Response, next: NextFunction) {
    if (this.isFirstRequest(request) && !this.isAssetsRequest) {
      const responseSender: ResponseFileSender = new ResponseSenderService();
      responseSender.setResponseObject(response);
      
      const rootFilePath = this.getRootFilePath();
      responseSender.sendFile(StatusCodes.SUCCESS, rootFilePath);
    } else {
      next();
    }
  }

  isFirstRequest(request: Request) {
    return !request.headers[RequestHeaders.REQUEST_FROM_CODE];
  }

  isAssetsRequest(request: Request) {
    return ASSETS_EXTNAME_REGEXP.test(extname(request.originalUrl));
  }

  getRootFilePath() {
    return join(this.publicPath, INDEX_FILENAME);
  }
}
