import { ControllerDesc, CreateUser } from './Decorators';
import { Body, Inject } from '@nestjs/common';
import { UserCreateDto } from 'src/core/dto/UserDto/Create';
import { UserCase } from 'src/app/use-cases';

@ControllerDesc()
export class UserController {
  constructor(
    @Inject(UserCase)
    private readonly userCase: UserCase
  ) {}
  @CreateUser()
  async createUser(@Body() user: UserCreateDto) {
    return this.userCase.create(user);
  }
}
