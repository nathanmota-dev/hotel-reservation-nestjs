import { Module } from '@nestjs/common';
import { PASSWORD_HASHER } from 'src/shared/domain/security/password-hasher.port';
import { BcryptPasswordHasherAdapter } from './bcrypt-password-hasher.adapter';

@Module({
  providers: [
    BcryptPasswordHasherAdapter,
    {
      provide: PASSWORD_HASHER,
      useExisting: BcryptPasswordHasherAdapter,
    },
  ],
  exports: [PASSWORD_HASHER],
})
export class SecurityModule {}
