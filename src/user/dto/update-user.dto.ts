export class UpdateUserDto {
  email?: string;
  password?: string;
  role?: 'USER' | 'ADMIN';
}
