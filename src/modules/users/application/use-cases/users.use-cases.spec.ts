import { vi } from 'vitest';
import { CreateUserUseCase } from './create-user.use-case';
import { DeleteUserUseCase } from './delete-user.use-case';
import { GetUserByIdUseCase } from './get-user-by-id.use-case';
import { UpdateUserUseCase } from './update-user.use-case';
import { PasswordHasherPort } from 'src/shared/domain/security/password-hasher.port';
import { UserRepository } from 'src/modules/users/domain/ports/user-repository.port';
import { UsersQueryPort } from 'src/modules/users/domain/ports/users-query.port';

describe('Users use cases', () => {
  const userRepository = {
    create: vi.fn(),
    delete: vi.fn(),
    findByEmail: vi.fn(),
    findById: vi.fn(),
    update: vi.fn(),
  } as UserRepository;
  const usersQueryPort = {
    findByEmail: vi.fn(),
    findById: vi.fn(),
  } as UsersQueryPort;
  const passwordHasher = {
    hash: vi.fn(),
    compare: vi.fn(),
  } as PasswordHasherPort;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should create a user with a hashed password', async () => {
    vi.mocked(passwordHasher.hash).mockResolvedValue('hashed-password');
    vi.mocked(userRepository.create).mockResolvedValue({
      id: 1,
      email: 'user@example.com',
      password: 'hashed-password',
      role: 'USER',
    } as never);
    const useCase = new CreateUserUseCase(userRepository, passwordHasher);

    await expect(
      useCase.execute({
        email: 'user@example.com',
        password: 'plain-password',
      }),
    ).resolves.toEqual({
      id: 1,
      email: 'user@example.com',
      password: 'hashed-password',
      role: 'USER',
    });

    expect(passwordHasher.hash).toHaveBeenCalledWith('plain-password');
    expect(userRepository.create).toHaveBeenCalledWith({
      email: 'user@example.com',
      password: 'hashed-password',
      role: 'USER',
    });
  });

  it('should fetch a user by id', async () => {
    vi.mocked(usersQueryPort.findById).mockResolvedValue({
      id: 2,
      email: 'user@example.com',
    } as never);
    const useCase = new GetUserByIdUseCase(usersQueryPort);

    await expect(useCase.execute(2)).resolves.toEqual({
      id: 2,
      email: 'user@example.com',
    });

    expect(usersQueryPort.findById).toHaveBeenCalledWith(2);
  });

  it('should update a user without rehashing when password is absent', async () => {
    vi.mocked(userRepository.update).mockResolvedValue({
      id: 3,
      email: 'updated@example.com',
    } as never);
    const useCase = new UpdateUserUseCase(userRepository, passwordHasher);

    await expect(
      useCase.execute(3, { email: 'updated@example.com' }),
    ).resolves.toEqual({
      id: 3,
      email: 'updated@example.com',
    });

    expect(passwordHasher.hash).not.toHaveBeenCalled();
    expect(userRepository.update).toHaveBeenCalledWith(3, {
      email: 'updated@example.com',
    });
  });

  it('should rehash the password when updating credentials', async () => {
    vi.mocked(passwordHasher.hash).mockResolvedValue('new-password-hash');
    vi.mocked(userRepository.update).mockResolvedValue({
      id: 4,
      password: 'new-password-hash',
    } as never);
    const useCase = new UpdateUserUseCase(userRepository, passwordHasher);

    await useCase.execute(4, { password: 'new-password' });

    expect(passwordHasher.hash).toHaveBeenCalledWith('new-password');
    expect(userRepository.update).toHaveBeenCalledWith(4, {
      password: 'new-password-hash',
    });
  });

  it('should delete a user', async () => {
    vi.mocked(userRepository.delete).mockResolvedValue({
      id: 5,
      email: 'deleted@example.com',
    } as never);
    const useCase = new DeleteUserUseCase(userRepository);

    await expect(useCase.execute(5)).resolves.toEqual({
      id: 5,
      email: 'deleted@example.com',
    });

    expect(userRepository.delete).toHaveBeenCalledWith(5);
  });
});
