import { Request, Response } from 'express';

import {
  LanguageParts,
  MiddlewarePathnames,
  RequestMethods,
  StatusCodes,
} from '../../common/constants';
import { Parameters } from '../constants';
import { ResponseSender } from '../types/services.types';
import { validLanguageParts, validLanguages } from '../data/valid.data';
import { ClientError } from '../services/errors.service';
import { BaseMiddleware } from './base.middleware';
import { ResponseSenderService } from '../services/response-sender.service';
import { LanguageResult, LanguageModel } from '../models/language.model';

export class LanguageMiddleware implements BaseMiddleware {
  pathname: string = MiddlewarePathnames.LANGUAGES;
  method: string = RequestMethods.GET;

  responseSender: ResponseSender = new ResponseSenderService();
  languageModel: LanguageModel = new LanguageModel();

  async handler(request: Request, response: Response): Promise<void> {
    this.responseSender.setResponseObject(response);

    try {
      const requestedLanguage: string = this.getRequestedLanguageFromParameters(request);
      this.validateRequestedLanguage(requestedLanguage, request);

      const requestedLanguageParts: LanguageParts[] = this.getRequestedLanguagePartsFromQuery(request);
      this.validateRequestedLanguageParts(requestedLanguageParts, request);
      
      const resultObject: LanguageResult = await this.languageModel.getLanguageParts(
        requestedLanguage, requestedLanguageParts
      );

      this.responseSender.sendSuccessJsonResponse(resultObject);
    } catch (error) {
      this.responseSender.sendErrorResponse(error);
    }
  }

  getRequestedLanguageFromParameters(request: Request): string {
    return request.params[Parameters.LANGUAGE];
  }

  validateRequestedLanguage(requestedLanguage: string, request: Request) {
    if (!validLanguages.includes(requestedLanguage)) {
      this.throwNotFindError(request);
    }
  }

  getRequestedLanguagePartsFromQuery(request: Request): LanguageParts[] {
    return request.query.languageParts as LanguageParts[];
  }

  validateRequestedLanguageParts(requestedLanguageParts: LanguageParts[], request: Request) {
    requestedLanguageParts.forEach((langaugePart) => {
      if (!validLanguageParts.includes(langaugePart)) {
        this.throwNotFindError(request);
      }
    });
  }

  throwNotFindError(request: Request) {
    throw new ClientError(
      `Resource on '${request.originalUrl}' not found`,
      StatusCodes.NOT_FOUND,
    );
  }
}
