import { UserRole } from 'src/modules/users/domain/entities/user.entity';

export class UpdateUserDto {
  email?: string;
  password?: string;
  role?: UserRole;
}
