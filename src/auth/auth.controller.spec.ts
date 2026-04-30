import { vi } from 'vitest';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  const authService = {
    singIn: vi.fn(),
  };

  let controller: AuthController;

  beforeEach(() => {
    vi.clearAllMocks();
    controller = new AuthController();
    (controller as any).authService = authService as unknown as AuthService;
  });

  it('should delegate signIn to AuthService.singIn', async () => {
    const body = {
      email: 'user@example.com',
      password: 'secret',
    };
    authService.singIn.mockResolvedValue({ access_token: 'jwt-token' });

    await expect(controller.signIn(body as any)).resolves.toEqual({
      access_token: 'jwt-token',
    });

    expect(authService.singIn).toHaveBeenCalledWith(body);
  });
});
