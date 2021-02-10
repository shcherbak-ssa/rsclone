import { sign, verify, VerifyOptions } from 'jsonwebtoken';

import { serverConfig } from '../config';
import { StatusCodes } from '../../common/constants';
import { AuthAccessToken, TokenPayload } from '../types/access-token.types';
import { ClientError } from './errors.service';

const AUTH_HEADER_SPLIT_STRING: string = ' ';

export class AccessTokenService implements AuthAccessToken {
  private jwtOptions: any = serverConfig.jwt.options;

  async createToken(payload: TokenPayload): Promise<string> {
    return sign(payload, process.env.JWT_SECRET_KEY as string, this.jwtOptions);
  }

  async verifyToken(token: string): Promise<TokenPayload> {
    try {
      return verify(
        token,
        process.env.JWT_SECRET_KEY as string,
        this.jwtOptions as VerifyOptions
      ) as TokenPayload;
    } catch (error) {
      throw new ClientError('Did not find authorization token', StatusCodes.UNAUTHORIZED);
    }
  }

  getTokenFromAuthHeader(authHeader: string | undefined): string | null {
    return authHeader && authHeader.split(AUTH_HEADER_SPLIT_STRING)[1] || null;
  }
}
