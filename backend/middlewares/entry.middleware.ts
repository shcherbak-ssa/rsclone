import { NextFunction, Request, Response } from 'express';

import { RequestMethods, RequestHeaders, StatusCodes } from '../../common/constants';
import { MiddlewarePathnames } from '../../common/constants';
import { StaticEntry } from '../types/static.types';
import { ResponseSender } from '../types/services.types';
import { ServerError } from '../services/errors.service';
import { BaseMiddleware } from "./base.middleware";
import { StaticService } from '../services/static.service';
import { ResponseSenderService } from '../services/response-sender.service';
import { ResponseService } from '../services/response.service';

export class EntryMiddleware implements BaseMiddleware {
  pathname: string = MiddlewarePathnames.ENTRY;
  method: string = RequestMethods.GET;

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
    if (this.isRequestFromCode(request)) {
      return false;
    }

    if (this.staticService.isAssetsRequest(request)) {
      return false;
    }

    return true;
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
      const responseService: ResponseService = serverError.getResponse();

      this.responseSender.endRequest(
        responseService.getStatusCode(),
        responseService.getBody()
      );
    }
  }
}
