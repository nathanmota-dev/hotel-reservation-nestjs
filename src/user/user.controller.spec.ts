import { vi } from 'vitest';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
  const userService = {
    createUser: vi.fn(),
    user: vi.fn(),
    updateUser: vi.fn(),
    deleteUser: vi.fn(),
  };

  let controller: UserController;

  beforeEach(() => {
    vi.clearAllMocks();
    controller = new UserController(userService as unknown as UserService);
  });

  it('should delegate user creation to UserService.createUser', async () => {
    const payload = {
      email: 'user@example.com',
      password: 'secret',
    };
    const createdUser = { id: 1, ...payload };
    userService.createUser.mockResolvedValue(createdUser);

    await expect(controller.signupUser(payload)).resolves.toEqual(createdUser);

    expect(userService.createUser).toHaveBeenCalledWith(payload);
  });

  it('should convert the route id to number when fetching a user', async () => {
    const foundUser = { id: 5, email: 'user@example.com' };
    userService.user.mockResolvedValue(foundUser);

    await expect(controller.getUserById('5')).resolves.toEqual(foundUser);

    expect(userService.user).toHaveBeenCalledWith({ id: 5 });
  });

  it('should convert the route id to number when updating a user', async () => {
    const payload = { email: 'updated@example.com' };
    const updatedUser = { id: 6, ...payload };
    userService.updateUser.mockResolvedValue(updatedUser);

    await expect(controller.updateUser(payload, '6')).resolves.toEqual(
      updatedUser,
    );

    expect(userService.updateUser).toHaveBeenCalledWith({
      where: { id: 6 },
      data: payload,
    });
  });

  it('should convert the route id to number when deleting a user', async () => {
    const deletedUser = { id: 7, email: 'deleted@example.com' };
    userService.deleteUser.mockResolvedValue(deletedUser);

    await expect(controller.deleteUser('7')).resolves.toEqual(deletedUser);

    expect(userService.deleteUser).toHaveBeenCalledWith({ id: 7 });
  });
});
