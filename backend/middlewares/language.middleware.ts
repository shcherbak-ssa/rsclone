import { Request, Response } from 'express';

import { RequestMethods, StatusCodes } from '../../common/constants';
import { MiddlewarePathnames, Parameters } from '../constants';
import { ResponseSender } from '../types/response-sender.types';
import { validLanguageParts, validLanguages } from '../data/valid.data';
import { ClientError } from '../data/errors.data';
import { BaseMiddleware } from './base.middleware';
import { ResponseSenderService } from '../services/response-sender.service';

export class LanguageMiddleware implements BaseMiddleware {
  pathname: string = MiddlewarePathnames.LANGUAGES;
  method: string = RequestMethods.GET;

  private responseSender: ResponseSender = new ResponseSenderService();

  async handler(request: Request, response: Response): Promise<void> {
    this.responseSender.setResponseObject(response);

    try {
      const requestedLanguage: string = this.getRequestedLanguageFromParameters(request);
      this.validateRequestedLanguageRequest(requestedLanguage, request);
      
      console.log(request.query);
      // @TODO: add condition for many parts
      response.status(200).end();
    } catch (error) {
      this.responseSender.sendErrorResponse(error);
    }
  }

  private getRequestedLanguageFromParameters(request: Request): string {
    return request.params[Parameters.LANGUAGE];
  }

  private getRequestedLanguagePartFromUrl(request: Request): string {
    return request.originalUrl.split('/').reverse()[0];
  }

  private validateRequestedLanguageRequest(requestedLanguage: string, request: Request) {
    if (!validLanguages.includes(requestedLanguage)) {
      throw new ClientError(
        `Resource on '${request.originalUrl}' not found`,
        StatusCodes.NOT_FOUND,
      );
    }
  }
}
