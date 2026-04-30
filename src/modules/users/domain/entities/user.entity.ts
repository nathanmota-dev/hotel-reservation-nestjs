export type UserRole = 'USER' | 'ADMIN';

export interface User {
  id: number;
  email: string;
  password: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateUserRecord {
  email: string;
  password: string;
  role?: UserRole;
}

export interface UpdateUserRecord {
  email?: string;
  password?: string;
  role?: UserRole;
}
