import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { InvalidCredentialsError } from 'src/modules/auth/domain/errors/invalid-credentials.error';
import { UserNotFoundError } from 'src/modules/auth/domain/errors/user-not-found.error';
import { SignInUseCase } from 'src/modules/auth/application/use-cases/sign-in.use-case';
import { SignInDto } from './dto/sign-in.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly signInUseCase: SignInUseCase) {}

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  async signIn(@Body() body: SignInDto) {
    try {
      return await this.signInUseCase.execute(body);
    } catch (error) {
      if (error instanceof UserNotFoundError) {
        throw new NotFoundException(error.message);
      }

      if (error instanceof InvalidCredentialsError) {
        throw new UnauthorizedException(error.message);
      }

      throw error;
    }
  }
}
