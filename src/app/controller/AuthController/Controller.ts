import { AuthUser, ControllerDesc } from './Decorators';
import { Body, Inject, Res } from '@nestjs/common';
import { UserCreateDto } from 'src/core/dto/UserDto/Create';
import { UserCase } from 'src/app/use-cases';
import { ResponseBuilder } from 'src/core/components/ResponseBuilder';
import { FastifyReply } from 'fastify';

@ControllerDesc()
export class AuthController {
  constructor(
    @Inject(UserCase)
    private readonly userCase: UserCase
  ) {}
  @AuthUser()
  async authUser(@Body() user: UserCreateDto, @Res({ passthrough: true }) response: FastifyReply) {
    return this.userCase.auth(user).then((token) => ResponseBuilder.success().setCookies(token, response).build());
  }
}
