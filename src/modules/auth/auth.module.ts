import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { SignInUseCase } from 'src/modules/auth/application/use-cases/sign-in.use-case';
import { JwtTokenService } from 'src/modules/auth/infrastructure/security/jwt-token.service';
import { AuthController } from 'src/modules/auth/presentation/http/auth.controller';
import { AuthGuard } from 'src/modules/auth/presentation/guards/auth.guard';
import {
  USERS_QUERY_PORT,
  UsersQueryPort,
} from 'src/modules/users/domain/ports/users-query.port';
import { UsersModule } from 'src/modules/users/users.module';
import {
  PASSWORD_HASHER,
  PasswordHasherPort,
} from 'src/shared/domain/security/password-hasher.port';
import {
  TOKEN_SERVICE,
  TokenServicePort,
} from 'src/shared/domain/security/token-service.port';
import { AppConfigService } from 'src/shared/infrastructure/config/app-config.service';
import { ConfigurationModule } from 'src/shared/infrastructure/config/configuration.module';
import { SecurityModule } from 'src/shared/infrastructure/security/security.module';

@Module({
  imports: [
    ConfigurationModule,
    SecurityModule,
    UsersModule,
    JwtModule.registerAsync({
      imports: [ConfigurationModule],
      inject: [AppConfigService],
      useFactory: (appConfigService: AppConfigService) => ({
        secret: appConfigService.getJwtSecret(),
        signOptions: { expiresIn: '3600s' },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthGuard,
    JwtTokenService,
    {
      provide: TOKEN_SERVICE,
      useExisting: JwtTokenService,
    },
    {
      provide: SignInUseCase,
      useFactory: (
        usersQueryPort: UsersQueryPort,
        passwordHasher: PasswordHasherPort,
        tokenService: TokenServicePort,
      ) => new SignInUseCase(usersQueryPort, passwordHasher, tokenService),
      inject: [USERS_QUERY_PORT, PASSWORD_HASHER, TOKEN_SERVICE],
    },
  ],
})
export class AuthModule {}
