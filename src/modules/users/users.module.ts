import { Module } from '@nestjs/common';
import { CreateUserUseCase } from 'src/modules/users/application/use-cases/create-user.use-case';
import { DeleteUserUseCase } from 'src/modules/users/application/use-cases/delete-user.use-case';
import { GetUserByIdUseCase } from 'src/modules/users/application/use-cases/get-user-by-id.use-case';
import { UpdateUserUseCase } from 'src/modules/users/application/use-cases/update-user.use-case';
import {
  USER_REPOSITORY,
  UserRepository,
} from 'src/modules/users/domain/ports/user-repository.port';
import {
  USERS_QUERY_PORT,
  UsersQueryPort,
} from 'src/modules/users/domain/ports/users-query.port';
import { DrizzleUsersRepository } from 'src/modules/users/infrastructure/persistence/drizzle/drizzle-users.repository';
import { UsersController } from 'src/modules/users/presentation/http/users.controller';
import {
  PASSWORD_HASHER,
  PasswordHasherPort,
} from 'src/shared/domain/security/password-hasher.port';
import { DatabaseModule } from 'src/shared/infrastructure/database/database.module';
import { SecurityModule } from 'src/shared/infrastructure/security/security.module';

@Module({
  imports: [DatabaseModule, SecurityModule],
  controllers: [UsersController],
  providers: [
    DrizzleUsersRepository,
    {
      provide: USER_REPOSITORY,
      useExisting: DrizzleUsersRepository,
    },
    {
      provide: USERS_QUERY_PORT,
      useExisting: DrizzleUsersRepository,
    },
    {
      provide: CreateUserUseCase,
      useFactory: (
        userRepository: UserRepository,
        passwordHasher: PasswordHasherPort,
      ) => new CreateUserUseCase(userRepository, passwordHasher),
      inject: [USER_REPOSITORY, PASSWORD_HASHER],
    },
    {
      provide: GetUserByIdUseCase,
      useFactory: (usersQueryPort: UsersQueryPort) =>
        new GetUserByIdUseCase(usersQueryPort),
      inject: [USERS_QUERY_PORT],
    },
    {
      provide: UpdateUserUseCase,
      useFactory: (
        userRepository: UserRepository,
        passwordHasher: PasswordHasherPort,
      ) => new UpdateUserUseCase(userRepository, passwordHasher),
      inject: [USER_REPOSITORY, PASSWORD_HASHER],
    },
    {
      provide: DeleteUserUseCase,
      useFactory: (userRepository: UserRepository) =>
        new DeleteUserUseCase(userRepository),
      inject: [USER_REPOSITORY],
    },
  ],
  exports: [USERS_QUERY_PORT],
})
export class UsersModule {}
