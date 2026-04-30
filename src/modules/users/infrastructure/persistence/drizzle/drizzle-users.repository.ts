import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import {
  CreateUserRecord,
  UpdateUserRecord,
} from 'src/modules/users/domain/entities/user.entity';
import { UserRepository } from 'src/modules/users/domain/ports/user-repository.port';
import { UsersQueryPort } from 'src/modules/users/domain/ports/users-query.port';
import { DrizzleService } from 'src/shared/infrastructure/database/drizzle.service';
import { usersTable } from './user.schema';

@Injectable()
export class DrizzleUsersRepository implements UserRepository, UsersQueryPort {
  constructor(private readonly drizzleService: DrizzleService) {}

  async findById(id: number) {
    const [user] = await this.drizzleService.db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, id))
      .limit(1);

    return user ?? null;
  }

  async findByEmail(email: string) {
    const [user] = await this.drizzleService.db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email))
      .limit(1);

    return user ?? null;
  }

  async create(data: CreateUserRecord) {
    const [user] = await this.drizzleService.db
      .insert(usersTable)
      .values({
        email: data.email,
        password: data.password,
        role: data.role ?? 'USER',
      })
      .returning();

    return user;
  }

  async update(id: number, data: UpdateUserRecord) {
    const [user] = await this.drizzleService.db
      .update(usersTable)
      .set({
        ...data,
        updatedAt: new Date(),
      })
      .where(eq(usersTable.id, id))
      .returning();

    return user ?? null;
  }

  async delete(id: number) {
    const [user] = await this.drizzleService.db
      .delete(usersTable)
      .where(eq(usersTable.id, id))
      .returning();

    return user ?? null;
  }
}
