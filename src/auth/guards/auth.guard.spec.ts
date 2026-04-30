import { AuthGuard } from './auth.guard';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { vi } from 'vitest';

describe('AuthGuard', () => {
  it('should be defined', () => {
    const jwtService = {} as JwtService;
    const configService = {
      get: vi.fn().mockReturnValue('test-secret'),
    } as unknown as ConfigService;

    expect(new AuthGuard(jwtService, configService)).toBeDefined();
  });
});
