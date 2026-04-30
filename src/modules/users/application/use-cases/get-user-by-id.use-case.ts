import { UsersQueryPort } from 'src/modules/users/domain/ports/users-query.port';

export class GetUserByIdUseCase {
  constructor(private readonly usersQueryPort: UsersQueryPort) {}

  async execute(id: number) {
    return this.usersQueryPort.findById(id);
  }
}
