import { NextFunction, Request, Response } from 'express';

import { StatusCodes } from '../../common/constants';
import { ErrorNames } from '../constants';
import { ResponseSender } from '../types/response-sender.types';
import { ResponseData } from '../data/response.data';
import { MiddlewareController } from './middleware.controller';
import { AccessTokenService } from '../services/access-token.service';
import { ResponseSenderService } from '../services/response-sender.service';
import { ClientError, ServerError } from '../data/errors.data';
import { AuthUserModel } from '../models/auth-user.model';

export type TokenPayloadType = {
  userID: string;
};

export interface AuthAccessToken {
  verifyToken(token: string): Promise<TokenPayloadType>;
  getTokenFromAuthHeader(authHeader: string | undefined): string | null;
};

export class AuthUserController implements MiddlewareController {
  pathname: string = '/@:username';
  private authAccessToken: AuthAccessToken = new AccessTokenService();
  private responseSender: ResponseSender = new ResponseSenderService();

  async handler(request: Request, response: Response, next: NextFunction) {
    this.responseSender.setResponseObject(response);

    try {
      const token = await this.getToken(request);
      const {userID} = await this.authAccessToken.verifyToken(token);
      const username = request.params.username;

      const authUserModel = new AuthUserModel();
      const isValidUser = await authUserModel.isValidUser({userID, username});

      if (isValidUser) {
        request.username = authUserModel.getAuthorizedUserUsername();
        return next();
      }

      throw new ClientError('Invalid username', StatusCodes.FORBIDDEN);
    } catch (error) {
      const errorResponse: ResponseData = await this.parseError(error);
      this.responseSender.sendJsonResponse(errorResponse);
    }
  }

  private async getToken(request: Request): Promise<string> {
    const authHeader = request.headers.authorization;
    const token = this.authAccessToken.getTokenFromAuthHeader(authHeader);

    if (token === null) {
      throw new ClientError('Did not find authorization header', StatusCodes.UNAUTHORIZED);
    }

    return token;
  }

  private async parseError(error: Error | ClientError) {
    console.log(error.name, error.message);
    if (error instanceof ClientError && error.name === ErrorNames.CLIENT_ERROR) {
      return error.getResponseData();
    }

    console.log(error); // @todo: add logger
    const serverError = new ServerError(error.message, {});
    return serverError.getResponseData();
  }
}
