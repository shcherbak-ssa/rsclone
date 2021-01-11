import { NextFunction, Request, Response } from 'express';

import { StatusCodes } from '../../common/constants';
import { MiddlewarePathnames, Parameters } from '../constants';
import { ResponseSender } from '../types/response-sender.types';

import { validLanguages } from '../data/valid.data';
import { ClientError } from '../data/errors.data';

import { BaseMiddleware } from "./base.middleware";
import { ResponseSenderService } from '../services/response-sender.service';

export class LanguageMiddleware implements BaseMiddleware {
  pathname: string = MiddlewarePathnames.LANGUAGES;
  private responseSender: ResponseSender = new ResponseSenderService();

  async handler(request: Request, response: Response, next: NextFunction) {
    this.responseSender.setResponseObject(response);

    try {
      const language = this.getLanguageFromParameters(request);
      this.validateLanguageRequest(language, request);
    } catch (error) {
      
    }
  }

  private getLanguageFromParameters(request: Request) {
    return request.params[Parameters.LANGUAGE];
  }

  private validateLanguageRequest(language: string, request: Request) {
    if (!validLanguages.includes(language)) {
      throw new ClientError(
        `Resource on '${request.originalUrl}' not found`,
        StatusCodes.NOT_FOUND,
      );
    }
  }
}
