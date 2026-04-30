import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { vi } from 'vitest';
import { SignInUseCase } from 'src/modules/auth/application/use-cases/sign-in.use-case';
import { InvalidCredentialsError } from 'src/modules/auth/domain/errors/invalid-credentials.error';
import { UserNotFoundError } from 'src/modules/auth/domain/errors/user-not-found.error';
import { AuthController } from './auth.controller';

describe('AuthController', () => {
  const signInUseCase = {
    execute: vi.fn(),
  } as Pick<SignInUseCase, 'execute'>;

  let controller: AuthController;

  beforeEach(() => {
    vi.clearAllMocks();
    controller = new AuthController(signInUseCase as SignInUseCase);
  });

  it('should delegate signIn to SignInUseCase', async () => {
    const body = {
      email: 'user@example.com',
      password: 'secret',
    };
    signInUseCase.execute.mockResolvedValue({ access_token: 'jwt-token' });

    await expect(controller.signIn(body)).resolves.toEqual({
      access_token: 'jwt-token',
    });

    expect(signInUseCase.execute).toHaveBeenCalledWith(body);
  });

  it('should map UserNotFoundError to NotFoundException', async () => {
    signInUseCase.execute.mockRejectedValue(new UserNotFoundError());

    await expect(
      controller.signIn({
        email: 'missing@example.com',
        password: 'secret',
      }),
    ).rejects.toBeInstanceOf(NotFoundException);
  });

  it('should map InvalidCredentialsError to UnauthorizedException', async () => {
    signInUseCase.execute.mockRejectedValue(new InvalidCredentialsError());

    await expect(
      controller.signIn({
        email: 'user@example.com',
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(UnauthorizedException);
  });
});
