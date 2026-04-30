import { User } from 'src/modules/users/domain/entities/user.entity';

export const USERS_QUERY_PORT = Symbol('USERS_QUERY_PORT');

export interface UsersQueryPort {
  findById(id: number): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
}
