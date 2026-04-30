export interface AuthTokenPayload {
  sub: number;
  [key: string]: unknown;
}

export const TOKEN_SERVICE = Symbol('TOKEN_SERVICE');

export interface TokenServicePort {
  signAccessToken(payload: AuthTokenPayload): Promise<string>;
  verifyAccessToken(token: string): Promise<AuthTokenPayload>;
}
