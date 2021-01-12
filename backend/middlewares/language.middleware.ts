import { Request, Response } from 'express';

import { LanguageParts, RequestMethods, StatusCodes } from '../../common/constants';
import { MiddlewarePathnames, Parameters } from '../constants';
import { ResponseSender } from '../types/response-sender.types';
import { validLanguageParts, validLanguages } from '../data/valid.data';
import { ClientError } from '../data/errors.data';
import { BaseMiddleware } from './base.middleware';
import { ResponseSenderService } from '../services/response-sender.service';
import { LanguageResult, LanguageModel } from '../models/language.model';
import { ResponseData } from '../data/response.data';

export class LanguageMiddleware implements BaseMiddleware {
  pathname: string = MiddlewarePathnames.LANGUAGES;
  method: string = RequestMethods.GET;

  private responseSender: ResponseSender = new ResponseSenderService();
  private languageModel: LanguageModel = new LanguageModel();

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

      const responseData: ResponseData = new ResponseData(StatusCodes.SUCCESS, resultObject);
      this.responseSender.sendJsonResponse(responseData);;
    } catch (error) {
      this.responseSender.sendErrorResponse(error);
    }
  }

  private getRequestedLanguageFromParameters(request: Request): string {
    return request.params[Parameters.LANGUAGE];
  }

  private validateRequestedLanguage(requestedLanguage: string, request: Request) {
    if (!validLanguages.includes(requestedLanguage)) {
      this.throwNotFindError(request);
    }
  }

  private getRequestedLanguagePartsFromQuery(request: Request): LanguageParts[] {
    return request.query.languageParts as LanguageParts[];
  }

  private validateRequestedLanguageParts(requestedLanguageParts: LanguageParts[], request: Request) {
    requestedLanguageParts.forEach((langaugePart) => {
      if (!validLanguageParts.includes(langaugePart)) {
        this.throwNotFindError(request);
      }
    });
  }

  private throwNotFindError(request: Request) {
    throw new ClientError(
      `Resource on '${request.originalUrl}' not found`,
      StatusCodes.NOT_FOUND,
    );
  }
}
