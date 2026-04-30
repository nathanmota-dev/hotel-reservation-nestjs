import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PasswordHasherPort } from 'src/shared/domain/security/password-hasher.port';

@Injectable()
export class BcryptPasswordHasherAdapter implements PasswordHasherPort {
  async hash(value: string): Promise<string> {
    return bcrypt.hash(value, 10);
  }

  async compare(value: string, hashedValue: string): Promise<boolean> {
    return bcrypt.compare(value, hashedValue);
  }
}
