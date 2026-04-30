import {
  CreateUserRecord,
  UpdateUserRecord,
  User,
} from 'src/modules/users/domain/entities/user.entity';

export const USER_REPOSITORY = Symbol('USER_REPOSITORY');

export interface UserRepository {
  findById(id: number): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  create(data: CreateUserRecord): Promise<User>;
  update(id: number, data: UpdateUserRecord): Promise<User | null>;
  delete(id: number): Promise<User | null>;
}
