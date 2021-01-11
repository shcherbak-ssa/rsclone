import { NextFunction, Request, Response } from 'express';

import { RequestMethods, RequestHeaders, StatusCodes } from '../../common/constants';
import { MiddlewarePathnames } from '../constants';
import { StaticEntry } from '../types/static.types';
import { ResponseSender } from '../types/response-sender.types';
import { ServerError } from '../data/errors.data';
import { BaseMiddleware } from "./base.middleware";
import { StaticService } from '../services/static.service';
import { ResponseSenderService } from '../services/response-sender.service';
import { ResponseData } from '../data/response.data';

export class EntryMiddleware implements BaseMiddleware {
  pathname: string = MiddlewarePathnames.ENTRY;
  private staticService: StaticEntry;
  private responseSender: ResponseSender;

  constructor() {
    this.staticService = new StaticService();
    this.responseSender = new ResponseSenderService();
  }

  async handler(request: Request, response: Response, next: NextFunction): Promise<void> {
    if (!this.isEntryRequest(request)) {
      return next();
    }

    this.responseSender.setResponseObject(response);
    this.sendEntryFile();
  }

  private isEntryRequest(request: Request): boolean {
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

  private isGetRequest(request: Request): boolean {
    return request.method === RequestMethods.GET;
  }

  private isRequestFromCode(request: Request): boolean {
    return !!request.headers[RequestHeaders.REQUEST_FROM_CODE];
  }

  private async sendEntryFile(): Promise<void> {
    try {
      const entryFilePath: string = this.staticService.getEntryFilePath();
      this.responseSender.sendFile(StatusCodes.SUCCESS, entryFilePath);   
    } catch (error) {
      console.log(error); // @TODO: add logger

      const serverError: ServerError = new ServerError(error.message, {});
      const responseData: ResponseData = serverError.getResponseData();

      this.responseSender.endRequest(
        responseData.getStatusCode(),
        responseData.getBody()
      );
    }
  }
}
