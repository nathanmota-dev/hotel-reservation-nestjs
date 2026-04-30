import { vi } from 'vitest';

vi.mock('bcrypt', () => ({
  compare: vi.fn(),
  hash: vi.fn(),
}));

import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/database/prisma.service';
import { UserService } from './user.service';

describe('UserService', () => {
  const prisma = {
    user: {
      findUnique: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    },
  };

  let service: UserService;

  beforeEach(() => {
    vi.clearAllMocks();
    service = new UserService();
    (service as any).prisma = prisma as unknown as PrismaService;
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should find a user by criteria', async () => {
    const user = { id: 1, email: 'user@example.com', password: 'hashed-password' };
    prisma.user.findUnique.mockResolvedValue(user);

    await expect(service.user({ id: 1 })).resolves.toEqual(user);

    expect(prisma.user.findUnique).toHaveBeenCalledWith({
      where: { id: 1 },
    });
  });

  it('should create a user with a hashed password', async () => {
    const payload = {
      email: 'user@example.com',
      password: 'plain-password',
    };
    vi.mocked(bcrypt.hash).mockImplementation(async () => 'hashed-password');
    prisma.user.create.mockResolvedValue({
      id: 1,
      email: payload.email,
      password: 'hashed-password',
    });

    await expect(service.createUser(payload as any)).resolves.toEqual({
      id: 1,
      email: payload.email,
      password: 'hashed-password',
    });

    expect(bcrypt.hash).toHaveBeenCalledWith('plain-password', 10);
    expect(prisma.user.create).toHaveBeenCalledWith({
      data: {
        ...payload,
        password: 'hashed-password',
      },
    });
  });

  it('should update a user', async () => {
    const params = {
      where: { id: 2 },
      data: { email: 'updated@example.com' },
    };
    const updatedUser = { id: 2, email: 'updated@example.com' };
    prisma.user.update.mockResolvedValue(updatedUser);

    await expect(service.updateUser(params as any)).resolves.toEqual(updatedUser);

    expect(prisma.user.update).toHaveBeenCalledWith(params);
  });

  it('should delete a user', async () => {
    const deletedUser = { id: 3, email: 'deleted@example.com' };
    prisma.user.delete.mockResolvedValue(deletedUser);

    await expect(service.deleteUser({ id: 3 })).resolves.toEqual(deletedUser);

    expect(prisma.user.delete).toHaveBeenCalledWith({
      where: { id: 3 },
    });
  });
});
