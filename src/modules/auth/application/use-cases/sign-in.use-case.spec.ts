import { vi } from 'vitest';
import { InvalidCredentialsError } from 'src/modules/auth/domain/errors/invalid-credentials.error';
import { UserNotFoundError } from 'src/modules/auth/domain/errors/user-not-found.error';
import { UsersQueryPort } from 'src/modules/users/domain/ports/users-query.port';
import { PasswordHasherPort } from 'src/shared/domain/security/password-hasher.port';
import { TokenServicePort } from 'src/shared/domain/security/token-service.port';
import { SignInUseCase } from './sign-in.use-case';

describe('SignInUseCase', () => {
  const usersQueryPort = {
    findByEmail: vi.fn(),
    findById: vi.fn(),
  } as UsersQueryPort;
  const passwordHasher = {
    hash: vi.fn(),
    compare: vi.fn(),
  } as PasswordHasherPort;
  const tokenService = {
    signAccessToken: vi.fn(),
    verifyAccessToken: vi.fn(),
  } as TokenServicePort;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should throw UserNotFoundError when the user does not exist', async () => {
    vi.mocked(usersQueryPort.findByEmail).mockResolvedValue(null);
    const useCase = new SignInUseCase(
      usersQueryPort,
      passwordHasher,
      tokenService,
    );

    await expect(
      useCase.execute({ email: 'missing@example.com', password: 'secret' }),
    ).rejects.toBeInstanceOf(UserNotFoundError);

    expect(usersQueryPort.findByEmail).toHaveBeenCalledWith(
      'missing@example.com',
    );
  });

  it('should throw InvalidCredentialsError when the password is invalid', async () => {
    vi.mocked(usersQueryPort.findByEmail).mockResolvedValue({
      id: 1,
      email: 'user@example.com',
      password: 'hashed-password',
    } as never);
    vi.mocked(passwordHasher.compare).mockResolvedValue(false);
    const useCase = new SignInUseCase(
      usersQueryPort,
      passwordHasher,
      tokenService,
    );

    await expect(
      useCase.execute({
        email: 'user@example.com',
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);

    expect(passwordHasher.compare).toHaveBeenCalledWith(
      'wrong-password',
      'hashed-password',
    );
  });

  it('should return an access token when the credentials are valid', async () => {
    vi.mocked(usersQueryPort.findByEmail).mockResolvedValue({
      id: 7,
      email: 'user@example.com',
      password: 'hashed-password',
    } as never);
    vi.mocked(passwordHasher.compare).mockResolvedValue(true);
    vi.mocked(tokenService.signAccessToken).mockResolvedValue('jwt-token');
    const useCase = new SignInUseCase(
      usersQueryPort,
      passwordHasher,
      tokenService,
    );

    await expect(
      useCase.execute({
        email: 'user@example.com',
        password: 'correct-password',
      }),
    ).resolves.toEqual({ access_token: 'jwt-token' });

    expect(tokenService.signAccessToken).toHaveBeenCalledWith({ sub: 7 });
  });
});
