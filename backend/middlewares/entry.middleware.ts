import { NextFunction, Request, Response } from 'express';

import { RequestMethods, RequestHeaders, StatusCodes } from '../../common/constants';
import { MiddlewarePathnames } from '../constants';

import { StaticEntryMiddleware } from '../types/static.types';
import { ResponseSender } from '../types/response-sender.types';
import { ServerError } from '../data/errors.data';

import { BaseMiddleware } from "./base.middleware";
import { StaticService } from '../services/static.service';
import { ResponseSenderService } from '../services/response-sender.service';


export class EntryMiddleware implements BaseMiddleware {
  pathname: string = MiddlewarePathnames.ENTRY;
  private staticService: StaticEntryMiddleware;

  constructor() {
    this.staticService = new StaticService();
  }

  async handler(request: Request, response: Response, next: NextFunction) {
    if (!this.isEntryRequest(request)) {
      return next();
    }

    this.responseWithRootFilename(response);
  }

  private isEntryRequest(request: Request) {
    if (!this.isGetRequest(request)) {
      return false;
    }

    if (this.isRequestFromCode(request)) {
      return false;
    }

    if (this.staticService.isAssetsRequest(request)) {
      return false;
    }

    return true;
  }

  private isGetRequest(request: Request) {
    return request.method === RequestMethods.GET;
  }

  private isRequestFromCode(request: Request) {
    return !!request.headers[RequestHeaders.REQUEST_FROM_CODE];
  }

  private async responseWithRootFilename(response: Response) {
    const responseSender: ResponseSender = ResponseSenderService.create(response);

    try {
      const rootFilePath = this.staticService.getRootFilePath();
      responseSender.sendFile(StatusCodes.SUCCESS, rootFilePath);   
    } catch (error) {
      console.log(error); // @TODO: add logger

      const serverError = new ServerError(error.message, {});
      const responseData = serverError.getResponseData();

      responseSender.endRequest(responseData.getStatusCode(), '');
    }
  }
}
