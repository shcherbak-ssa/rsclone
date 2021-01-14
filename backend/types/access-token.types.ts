export type TokenPayloadType = {
  userID: string;
};

export interface AuthAccessToken {
  verifyToken(token: string): Promise<TokenPayloadType>;
  getTokenFromAuthHeader(authHeader: string | undefined): string | null;
};
