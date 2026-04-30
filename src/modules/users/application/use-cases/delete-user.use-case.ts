import { UserRepository } from 'src/modules/users/domain/ports/user-repository.port';

export class DeleteUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(id: number) {
    return this.userRepository.delete(id);
  }
}
