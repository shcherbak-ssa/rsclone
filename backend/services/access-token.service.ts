import { sign, verify, VerifyOptions } from 'jsonwebtoken';

import { serverConfig } from '../config';
import { StatusCodes } from '../../common/constants';
import { AuthAccessToken, TokenPayload } from '../types/access-token.types';
import { ClientError } from './errors.service';

import serverConfigJson from '../../config/server.config.json';

const AUTH_HEADER_SPLIT_STRING: string = ' ';

export class AccessTokenService implements AuthAccessToken {
  private jwtOptions: any = serverConfig.jwt.options;

  async createToken(payload: TokenPayload): Promise<string> {
    return sign(payload, serverConfigJson.jwt.secretKey, this.jwtOptions);
  }

  async verifyToken(token: string): Promise<TokenPayload> {
    try {
      return verify(token, serverConfigJson.jwt.secretKey, this.jwtOptions as VerifyOptions) as TokenPayload;
    } catch (error) {
      throw new ClientError('Did not find authorization token', StatusCodes.UNAUTHORIZED);
    }
  }

  getTokenFromAuthHeader(authHeader: string | undefined): string | null {
    return authHeader && authHeader.split(AUTH_HEADER_SPLIT_STRING)[1] || null;
  }
}
