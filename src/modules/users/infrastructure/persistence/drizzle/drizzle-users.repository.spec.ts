import { vi } from 'vitest';
import { DrizzleService } from 'src/shared/infrastructure/database/drizzle.service';
import { DrizzleUsersRepository } from './drizzle-users.repository';

describe('DrizzleUsersRepository', () => {
  const limit = vi.fn();
  const where = vi.fn();
  const from = vi.fn();
  const values = vi.fn();
  const returning = vi.fn();
  const set = vi.fn();
  const db = {
    select: vi.fn(),
    insert: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  };

  let repository: DrizzleUsersRepository;

  beforeEach(() => {
    vi.clearAllMocks();
    limit.mockResolvedValue([]);
    returning.mockResolvedValue([]);
    where.mockReturnValue({ limit, returning });
    from.mockReturnValue({ where });
    values.mockReturnValue({ returning });
    set.mockReturnValue({ where });
    db.select.mockReturnValue({ from });
    db.insert.mockReturnValue({ values });
    db.update.mockReturnValue({ set });
    db.delete.mockReturnValue({ where });

    repository = new DrizzleUsersRepository({
      db,
    } as unknown as DrizzleService);
  });

  it('should find a user by id', async () => {
    limit.mockResolvedValue([{ id: 1, email: 'user@example.com' }]);

    await expect(repository.findById(1)).resolves.toEqual({
      id: 1,
      email: 'user@example.com',
    });

    expect(db.select).toHaveBeenCalled();
    expect(limit).toHaveBeenCalledWith(1);
  });

  it('should find a user by email', async () => {
    limit.mockResolvedValue([{ id: 2, email: 'user@example.com' }]);

    await expect(repository.findByEmail('user@example.com')).resolves.toEqual({
      id: 2,
      email: 'user@example.com',
    });

    expect(db.select).toHaveBeenCalled();
    expect(limit).toHaveBeenCalledWith(1);
  });

  it('should create a user', async () => {
    returning.mockResolvedValue([{ id: 3, email: 'user@example.com' }]);

    await expect(
      repository.create({
        email: 'user@example.com',
        password: 'hashed-password',
        role: 'USER',
      }),
    ).resolves.toEqual({
      id: 3,
      email: 'user@example.com',
    });

    expect(db.insert).toHaveBeenCalled();
    expect(values).toHaveBeenCalledWith({
      email: 'user@example.com',
      password: 'hashed-password',
      role: 'USER',
    });
  });

  it('should update a user', async () => {
    returning.mockResolvedValue([{ id: 4, email: 'updated@example.com' }]);

    await expect(
      repository.update(4, { email: 'updated@example.com' }),
    ).resolves.toEqual({
      id: 4,
      email: 'updated@example.com',
    });

    expect(db.update).toHaveBeenCalled();
    expect(set).toHaveBeenCalledWith(
      expect.objectContaining({
        email: 'updated@example.com',
      }),
    );
  });

  it('should delete a user', async () => {
    returning.mockResolvedValue([{ id: 5, email: 'deleted@example.com' }]);

    await expect(repository.delete(5)).resolves.toEqual({
      id: 5,
      email: 'deleted@example.com',
    });

    expect(db.delete).toHaveBeenCalled();
  });
});
