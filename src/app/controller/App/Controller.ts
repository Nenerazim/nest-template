import { ControllerDesc, Test, Test2 } from './Decorators';
import { UserRepository } from 'src/app/repository/UserRepository';
import { Body, Inject } from '@nestjs/common';
import { TestDto } from 'src/core/dto/Test';

@ControllerDesc()
export class AppDataController {
  constructor(
    @Inject(UserRepository)
    private readonly userRepository: UserRepository
  ) {}
  @Test()
  async test(@Body() user: TestDto) {
    return this.userRepository.create(user);
  }

  @Test2()
  async test2() {
    return this.userRepository.findAll();
  }
}
