import { NextFunction, Request, Response } from 'express';

import { StatusCodes, MiddlewarePathnames } from '../../common/constants';
import { Parameters } from '../constants';
import { ResponseSender } from '../types/services.types';
import { ClientError } from '../data/errors.data';
import { AuthUserModel } from '../models/auth-user.model';
import { BaseMiddleware } from "./base.middleware";
import { AccessTokenService } from '../services/access-token.service';
import { ResponseSenderService } from '../services/response-sender.service';
import { VerifyUser } from '../types/user.types';
import { AuthAccessToken } from '../types/access-token.types';

export class AuthUserMiddleware implements BaseMiddleware {
  pathname: string = MiddlewarePathnames.AUTH_USER;
  method: null = null;

  private authUserModel: AuthUserModel = new AuthUserModel();
  private authAccessToken: AuthAccessToken = new AccessTokenService();
  private responseSender: ResponseSender = new ResponseSenderService();

  async handler(request: Request, response: Response, next: NextFunction) {
    this.responseSender.setResponseObject(response);

    try {
      const verifyUser: VerifyUser = await this.verifyToken(request);
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

  private async verifyToken(request: Request): Promise<VerifyUser> {
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

  private async verifyUser(verifyUser: VerifyUser): Promise<boolean> {
    return await this.authUserModel.isValidUser(verifyUser);
  }
}
