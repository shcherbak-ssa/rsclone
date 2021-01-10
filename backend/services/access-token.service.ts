import { verify, VerifyOptions } from 'jsonwebtoken';

import { StatusCodes } from '../../common/constants';
import { AuthAccessToken, TokenPayloadType } from '../controllers/auth-user.controller';
import { ClientError } from '../data/errors.data';

import serverConfig from '../../config/server.config.json';

const AUTH_HEADER_SPLIT_STRING: string = ' ';

export class AccessTokenService implements AuthAccessToken {
  async verifyToken(token: string) {
    try {
      const {jwt} = serverConfig;
      return verify(token, jwt.secretKey, jwt.options as VerifyOptions) as TokenPayloadType;
    } catch (error) {
      throw new ClientError('', StatusCodes.UNAUTHORIZED);
    }
  }

  getTokenFromAuthHeader(authHeader: string | undefined) {
    return authHeader && authHeader.split(AUTH_HEADER_SPLIT_STRING)[1] || null;
  }
}
