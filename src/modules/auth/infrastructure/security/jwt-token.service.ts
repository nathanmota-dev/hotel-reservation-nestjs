import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  AuthTokenPayload,
  TokenServicePort,
} from 'src/shared/domain/security/token-service.port';

@Injectable()
export class JwtTokenService implements TokenServicePort {
  constructor(private readonly jwtService: JwtService) {}

  async signAccessToken(payload: AuthTokenPayload): Promise<string> {
    return this.jwtService.signAsync(payload);
  }

  async verifyAccessToken(token: string): Promise<AuthTokenPayload> {
    return this.jwtService.verifyAsync<AuthTokenPayload>(token);
  }
}
