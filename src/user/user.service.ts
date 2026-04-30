import { Injectable } from '@nestjs/common';
import { SQL, and, eq } from 'drizzle-orm';
import * as bcrypt from 'bcrypt';
import { DrizzleService } from 'src/database/drizzle.service';
import { users } from 'src/database/schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.types';

@Injectable()
export class UserService {
  constructor(private readonly drizzle: DrizzleService) {}

  private buildWhereClause(where: { id?: number; email?: string }): SQL {
    const filters = [
      where.id !== undefined ? eq(users.id, where.id) : undefined,
      where.email !== undefined ? eq(users.email, where.email) : undefined,
    ].filter((value): value is SQL => value !== undefined);

    if (filters.length === 0) {
      throw new Error('At least one user filter must be provided');
    }

    return filters.length === 1 ? filters[0] : and(...filters);
  }

  async user(where: { id?: number; email?: string }): Promise<User | null> {
    const [user] = await this.drizzle.db
      .select()
      .from(users)
      .where(this.buildWhereClause(where))
      .limit(1);

    return user ?? null;
  }

  async createUser(data: CreateUserDto): Promise<User> {
    const hashPassword = await bcrypt.hash(data.password, 10);
    const [user] = await this.drizzle.db
      .insert(users)
      .values({
        email: data.email,
        password: hashPassword,
        role: data.role ?? 'USER',
      })
      .returning();

    return user;
  }

  async updateUser(params: {
    where: { id?: number; email?: string };
    data: UpdateUserDto;
  }): Promise<User> {
    const { where, data } = params;
    const updatedData: Partial<typeof users.$inferInsert> = {
      ...data,
      updatedAt: new Date(),
    };

    if (data.password) {
      updatedData.password = await bcrypt.hash(data.password, 10);
    }

    const [updatedUser] = await this.drizzle.db
      .update(users)
      .set(updatedData)
      .where(this.buildWhereClause(where))
      .returning();

    return updatedUser;
  }

  async deleteUser(where: { id?: number; email?: string }): Promise<User> {
    const [deletedUser] = await this.drizzle.db
      .delete(users)
      .where(this.buildWhereClause(where))
      .returning();

    return deletedUser;
  }
}
