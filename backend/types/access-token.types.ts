export type TokenPayload = {
  userID: string;
};

export interface AuthAccessToken {
  createToken(payload: TokenPayload): Promise<string>;
  verifyToken(token: string): Promise<TokenPayload>;
  getTokenFromAuthHeader(authHeader: string | undefined): string | null;
};
