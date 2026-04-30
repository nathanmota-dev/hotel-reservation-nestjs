import { PasswordHasherPort } from 'src/shared/domain/security/password-hasher.port';
import { UserRole } from 'src/modules/users/domain/entities/user.entity';
import { UserRepository } from 'src/modules/users/domain/ports/user-repository.port';

export interface UpdateUserInput {
  email?: string;
  password?: string;
  role?: UserRole;
}

export class UpdateUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordHasher: PasswordHasherPort,
  ) {}

  async execute(id: number, input: UpdateUserInput) {
    if (!input.password) {
      return this.userRepository.update(id, input);
    }

    const hashedPassword = await this.passwordHasher.hash(input.password);

    return this.userRepository.update(id, {
      ...input,
      password: hashedPassword,
    });
  }
}
