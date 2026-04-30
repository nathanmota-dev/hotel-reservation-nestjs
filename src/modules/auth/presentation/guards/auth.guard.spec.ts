import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { vi } from 'vitest';
import { TokenServicePort } from 'src/shared/domain/security/token-service.port';
import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  const tokenService = {
    signAccessToken: vi.fn(),
    verifyAccessToken: vi.fn(),
  } as TokenServicePort;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should be defined', () => {
    expect(new AuthGuard(tokenService)).toBeDefined();
  });

  it('should attach the verified payload to the request', async () => {
    vi.mocked(tokenService.verifyAccessToken).mockResolvedValue({ sub: 1 });
    const request = {
      headers: {
        authorization: 'Bearer token-value',
      },
    };
    const context = {
      switchToHttp: () => ({
        getRequest: () => request,
      }),
    } as ExecutionContext;
    const guard = new AuthGuard(tokenService);

    await expect(guard.canActivate(context)).resolves.toBe(true);

    expect(tokenService.verifyAccessToken).toHaveBeenCalledWith('token-value');
    expect(request['user']).toEqual({ sub: 1 });
  });

  it('should throw UnauthorizedException when the token is missing', async () => {
    const request = {
      headers: {},
    };
    const context = {
      switchToHttp: () => ({
        getRequest: () => request,
      }),
    } as ExecutionContext;
    const guard = new AuthGuard(tokenService);

    await expect(guard.canActivate(context)).rejects.toBeInstanceOf(
      UnauthorizedException,
    );
  });
});
