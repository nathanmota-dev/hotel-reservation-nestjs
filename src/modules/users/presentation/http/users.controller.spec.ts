import { vi } from 'vitest';
import { CreateUserUseCase } from 'src/modules/users/application/use-cases/create-user.use-case';
import { DeleteUserUseCase } from 'src/modules/users/application/use-cases/delete-user.use-case';
import { GetUserByIdUseCase } from 'src/modules/users/application/use-cases/get-user-by-id.use-case';
import { UpdateUserUseCase } from 'src/modules/users/application/use-cases/update-user.use-case';
import { UsersController } from './users.controller';

describe('UsersController', () => {
  const createUserUseCase = {
    execute: vi.fn(),
  } as Pick<CreateUserUseCase, 'execute'>;
  const getUserByIdUseCase = {
    execute: vi.fn(),
  } as Pick<GetUserByIdUseCase, 'execute'>;
  const updateUserUseCase = {
    execute: vi.fn(),
  } as Pick<UpdateUserUseCase, 'execute'>;
  const deleteUserUseCase = {
    execute: vi.fn(),
  } as Pick<DeleteUserUseCase, 'execute'>;

  let controller: UsersController;

  beforeEach(() => {
    vi.clearAllMocks();
    controller = new UsersController(
      createUserUseCase as CreateUserUseCase,
      getUserByIdUseCase as GetUserByIdUseCase,
      updateUserUseCase as UpdateUserUseCase,
      deleteUserUseCase as DeleteUserUseCase,
    );
  });

  it('should delegate user creation to CreateUserUseCase', async () => {
    const payload = {
      email: 'user@example.com',
      password: 'secret',
    };
    const createdUser = { id: 1, ...payload };
    createUserUseCase.execute.mockResolvedValue(createdUser);

    await expect(controller.signupUser(payload)).resolves.toEqual(createdUser);

    expect(createUserUseCase.execute).toHaveBeenCalledWith(payload);
  });

  it('should convert the route id to number when fetching a user', async () => {
    const foundUser = { id: 5, email: 'user@example.com' };
    getUserByIdUseCase.execute.mockResolvedValue(foundUser);

    await expect(controller.getUserById('5')).resolves.toEqual(foundUser);

    expect(getUserByIdUseCase.execute).toHaveBeenCalledWith(5);
  });

  it('should convert the route id to number when updating a user', async () => {
    const payload = { email: 'updated@example.com' };
    const updatedUser = { id: 6, ...payload };
    updateUserUseCase.execute.mockResolvedValue(updatedUser);

    await expect(controller.updateUser(payload, '6')).resolves.toEqual(
      updatedUser,
    );

    expect(updateUserUseCase.execute).toHaveBeenCalledWith(6, payload);
  });

  it('should convert the route id to number when deleting a user', async () => {
    const deletedUser = { id: 7, email: 'deleted@example.com' };
    deleteUserUseCase.execute.mockResolvedValue(deletedUser);

    await expect(controller.deleteUser('7')).resolves.toEqual(deletedUser);

    expect(deleteUserUseCase.execute).toHaveBeenCalledWith(7);
  });
});
