import { vi } from 'vitest';

vi.mock('bcrypt', () => ({
  compare: vi.fn(),
  hash: vi.fn(),
}));

import * as bcrypt from 'bcrypt';
import { DrizzleService } from 'src/database/drizzle.service';
import { UserService } from './user.service';

describe('UserService', () => {
  const where = vi.fn();
  const limit = vi.fn();
  const returning = vi.fn();
  const values = vi.fn();
  const set = vi.fn();
  const from = vi.fn();
  const db = {
    select: vi.fn(),
    from,
    insert: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  };

  let service: UserService;

  beforeEach(() => {
    vi.clearAllMocks();
    where.mockReturnValue({ limit, returning });
    limit.mockResolvedValue([]);
    returning.mockResolvedValue([]);
    values.mockReturnValue({ returning });
    set.mockReturnValue({ where: vi.fn().mockReturnValue({ returning }) });
    from.mockReturnValue({ where: vi.fn().mockReturnValue({ limit }) });
    db.select.mockReturnValue({ from });
    db.insert.mockReturnValue({ values });
    db.update.mockReturnValue({ set });
    db.delete.mockReturnValue({
      where: vi.fn().mockReturnValue({ returning }),
    });

    service = new UserService({ db } as unknown as DrizzleService);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should find a user by criteria', async () => {
    const user = {
      id: 1,
      email: 'user@example.com',
      password: 'hashed-password',
    };
    limit.mockResolvedValue([user]);

    await expect(service.user({ id: 1 })).resolves.toEqual(user);

    expect(db.select).toHaveBeenCalled();
    expect(from).toHaveBeenCalled();
    expect(limit).toHaveBeenCalledWith(1);
  });

  it('should create a user with a hashed password', async () => {
    const payload = {
      email: 'user@example.com',
      password: 'plain-password',
    };
    vi.mocked(bcrypt.hash).mockImplementation(async () => 'hashed-password');
    returning.mockResolvedValue([
      { id: 1, email: payload.email, password: 'hashed-password' },
    ]);

    await expect(service.createUser(payload)).resolves.toEqual({
      id: 1,
      email: payload.email,
      password: 'hashed-password',
    });

    expect(bcrypt.hash).toHaveBeenCalledWith('plain-password', 10);
    expect(db.insert).toHaveBeenCalled();
    expect(values).toHaveBeenCalledWith({
      email: payload.email,
      password: 'hashed-password',
      role: 'USER',
    });
  });

  it('should update a user', async () => {
    const params = {
      where: { id: 2 },
      data: { email: 'updated@example.com' },
    };
    const updatedUser = { id: 2, email: 'updated@example.com' };
    returning.mockResolvedValue([updatedUser]);

    await expect(service.updateUser(params)).resolves.toEqual(updatedUser);

    expect(db.update).toHaveBeenCalled();
    expect(set).toHaveBeenCalledWith(
      expect.objectContaining({
        email: 'updated@example.com',
      }),
    );
  });

  it('should delete a user', async () => {
    const deletedUser = { id: 3, email: 'deleted@example.com' };
    returning.mockResolvedValue([deletedUser]);

    await expect(service.deleteUser({ id: 3 })).resolves.toEqual(deletedUser);

    expect(db.delete).toHaveBeenCalled();
  });

  it('should hash the password when updating a user password', async () => {
    vi.mocked(bcrypt.hash).mockImplementation(async () => 'new-password-hash');
    returning.mockResolvedValue([
      { id: 4, email: 'user@example.com', password: 'new-password-hash' },
    ]);

    await service.updateUser({
      where: { id: 4 },
      data: { password: 'new-password' },
    });

    expect(bcrypt.hash).toHaveBeenCalledWith('new-password', 10);
    expect(set).toHaveBeenCalledWith(
      expect.objectContaining({
        password: 'new-password-hash',
      }),
    );
  });
});
