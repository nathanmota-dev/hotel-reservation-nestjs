import { UserRole } from 'src/modules/users/domain/entities/user.entity';

export class CreateUserDto {
  email: string;
  password: string;
  role?: UserRole;
}
