import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { vi } from 'vitest';

vi.mock('bcrypt', () => ({
  compare: vi.fn(),
  hash: vi.fn(),
}));

import * as bcrypt from 'bcrypt';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';

describe('AuthService', () => {
  const userService = {
    user: vi.fn(),
  };
  const jwtService = {
    signAsync: vi.fn(),
  };

  let service: AuthService;

  beforeEach(() => {
    vi.clearAllMocks();
    service = new AuthService(
      userService as unknown as UserService,
      jwtService as unknown as JwtService,
    );
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should throw NotFoundException when user does not exist', async () => {
    userService.user.mockResolvedValue(null);

    await expect(
      service.singIn({ email: 'missing@example.com', password: 'secret' }),
    ).rejects.toBeInstanceOf(NotFoundException);

    expect(userService.user).toHaveBeenCalledWith({
      email: 'missing@example.com',
    });
    expect(jwtService.signAsync).not.toHaveBeenCalled();
  });

  it('should throw UnauthorizedException when password is invalid', async () => {
    userService.user.mockResolvedValue({
      id: 1,
      email: 'user@example.com',
      password: 'hashed-password',
    });
    vi.mocked(bcrypt.compare).mockImplementation(async () => false);

    await expect(
      service.singIn({ email: 'user@example.com', password: 'wrong-password' }),
    ).rejects.toBeInstanceOf(UnauthorizedException);

    expect(bcrypt.compare).toHaveBeenCalledWith(
      'wrong-password',
      'hashed-password',
    );
    expect(jwtService.signAsync).not.toHaveBeenCalled();
  });

  it('should return an access token when credentials are valid', async () => {
    userService.user.mockResolvedValue({
      id: 7,
      email: 'user@example.com',
      password: 'hashed-password',
    });
    vi.mocked(bcrypt.compare).mockImplementation(async () => true);
    jwtService.signAsync.mockResolvedValue('jwt-token');

    await expect(
      service.singIn({
        email: 'user@example.com',
        password: 'correct-password',
      }),
    ).resolves.toEqual({ access_token: 'jwt-token' });

    expect(bcrypt.compare).toHaveBeenCalledWith(
      'correct-password',
      'hashed-password',
    );
    expect(jwtService.signAsync).toHaveBeenCalledWith({ sub: 7 });
  });
});
