import { NextFunction, Request, Response } from 'express';

import { StatusCodes, MiddlewarePathnames } from '../../common/constants';
import { Parameters } from '../constants';
import { ResponseSender } from '../types/response-sender.types';
import { ClientError } from '../data/errors.data';
import { AuthUserModel, VerifyUserType } from '../models/auth-user.model';
import { BaseMiddleware } from "./base.middleware";
import { AccessTokenService } from '../services/access-token.service';
import { ResponseSenderService } from '../services/response-sender.service';

export type TokenPayloadType = {
  userID: string;
};

export interface AuthAccessToken {
  verifyToken(token: string): Promise<TokenPayloadType>;
  getTokenFromAuthHeader(authHeader: string | undefined): string | null;
};

export class AuthUserMiddleware implements BaseMiddleware {
  pathname: string = MiddlewarePathnames.AUTH_USER;
  method: null = null;

  private authUserModel: AuthUserModel = new AuthUserModel();
  private authAccessToken: AuthAccessToken = new AccessTokenService();
  private responseSender: ResponseSender = new ResponseSenderService();

  async handler(request: Request, response: Response, next: NextFunction) {
    this.responseSender.setResponseObject(response);

    try {
      const verifyUser: VerifyUserType = await this.verifyToken(request);
      const isValidUser: boolean = await this.verifyUser(verifyUser);

      if (isValidUser) {
        request.username = verifyUser.username;
        return next();
      }

      throw new ClientError(
        `Invalid username '@${verifyUser.username}'`,
        StatusCodes.FORBIDDEN
      );
    } catch (error) {
      this.responseSender.sendErrorResponse(error);
    }
  }

  private async verifyToken(request: Request): Promise<VerifyUserType> {
    const token = await this.getToken(request);
    const {userID} = await this.authAccessToken.verifyToken(token);
    const username = this.getUsernameFromParameters(request);
    return {userID, username};
  }

  private async getToken(request: Request): Promise<string> {
    const authHeader: string | undefined = this.getAuthorizationHeader(request);
    const token: string | null = this.authAccessToken.getTokenFromAuthHeader(authHeader);

    if (token === null) {
      throw new ClientError(
        'Did not find authorization token',
        StatusCodes.UNAUTHORIZED
      );
    }

    return token;
  }

  private getAuthorizationHeader(request: Request): string | undefined {
    return request.headers.authorization;
  }

  private getUsernameFromParameters(request: Request): string {
    return request.params[Parameters.USERNAME];
  }

  private async verifyUser(verifyUser: VerifyUserType): Promise<boolean> {
    return await this.authUserModel.isValidUser(verifyUser);
  }
}
