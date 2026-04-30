import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserUseCase } from 'src/modules/users/application/use-cases/create-user.use-case';
import { DeleteUserUseCase } from 'src/modules/users/application/use-cases/delete-user.use-case';
import { GetUserByIdUseCase } from 'src/modules/users/application/use-cases/get-user-by-id.use-case';
import { UpdateUserUseCase } from 'src/modules/users/application/use-cases/update-user.use-case';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UsersController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly getUserByIdUseCase: GetUserByIdUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
  ) {}

  @Post()
  async signupUser(@Body() userData: CreateUserDto) {
    return this.createUserUseCase.execute(userData);
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    return this.getUserByIdUseCase.execute(Number(id));
  }

  @Put(':id')
  async updateUser(@Body() userData: UpdateUserDto, @Param('id') id: string) {
    return this.updateUserUseCase.execute(Number(id), userData);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return this.deleteUserUseCase.execute(Number(id));
  }
}
