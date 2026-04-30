import { PasswordHasherPort } from 'src/shared/domain/security/password-hasher.port';
import { UserRole } from 'src/modules/users/domain/entities/user.entity';
import { UserRepository } from 'src/modules/users/domain/ports/user-repository.port';

export interface CreateUserInput {
  email: string;
  password: string;
  role?: UserRole;
}

export class CreateUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordHasher: PasswordHasherPort,
  ) {}

  async execute(input: CreateUserInput) {
    const hashedPassword = await this.passwordHasher.hash(input.password);

    return this.userRepository.create({
      email: input.email,
      password: hashedPassword,
      role: input.role ?? 'USER',
    });
  }
}
