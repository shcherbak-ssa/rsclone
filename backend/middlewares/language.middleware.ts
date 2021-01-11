import { Request, Response } from 'express';

import { StatusCodes } from '../../common/constants';
import { MiddlewarePathnames, Parameters } from '../constants';
import { ResponseSender } from '../types/response-sender.types';
import { validLanguageParts, validLanguages } from '../data/valid.data';
import { ClientError } from '../data/errors.data';
import { BaseMiddleware } from "./base.middleware";
import { ResponseSenderService } from '../services/response-sender.service';

export class LanguageMiddleware implements BaseMiddleware {
  pathname: string = MiddlewarePathnames.LANGUAGES;
  private responseSender: ResponseSender = new ResponseSenderService();

  async handler(request: Request, response: Response): Promise<void> {
    this.responseSender.setResponseObject(response);

    try {
      const requestedLanguage: string = this.getRequestedLanguageFromParameters(request);
      const requestedLanguagePart: string = this.getRequestedLanguagePartFromUrl(request);
      this.validateLanguageRequest(requestedLanguage, requestedLanguagePart, request);

      // @TODO: add condition for many parts
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

  private validateLanguageRequest(
    requestedLanguage: string, requestedLanguagePart: string, request: Request,
  ) {
    if (
      !validLanguages.includes(requestedLanguage) ||
      !validLanguageParts.includes(requestedLanguagePart)
    ) {
      throw new ClientError(
        `Resource on '${request.originalUrl}' not found`,
        StatusCodes.NOT_FOUND,
      );
    }
  }
}
