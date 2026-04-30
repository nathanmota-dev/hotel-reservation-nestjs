import { InvalidCredentialsError } from 'src/modules/auth/domain/errors/invalid-credentials.error';
import { UserNotFoundError } from 'src/modules/auth/domain/errors/user-not-found.error';
import { UsersQueryPort } from 'src/modules/users/domain/ports/users-query.port';
import { PasswordHasherPort } from 'src/shared/domain/security/password-hasher.port';
import { TokenServicePort } from 'src/shared/domain/security/token-service.port';

export interface SignInInput {
  email: string;
  password: string;
}

export interface SignInOutput {
  access_token: string;
}

export class SignInUseCase {
  constructor(
    private readonly usersQueryPort: UsersQueryPort,
    private readonly passwordHasher: PasswordHasherPort,
    private readonly tokenService: TokenServicePort,
  ) {}

  async execute(input: SignInInput): Promise<SignInOutput> {
    const user = await this.usersQueryPort.findByEmail(input.email);

    if (!user) {
      throw new UserNotFoundError();
    }

    const passwordMatch = await this.passwordHasher.compare(
      input.password,
      user.password,
    );

    if (!passwordMatch) {
      throw new InvalidCredentialsError();
    }

    return {
      access_token: await this.tokenService.signAccessToken({ sub: user.id }),
    };
  }
}
