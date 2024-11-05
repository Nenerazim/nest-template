import { HttpException, HttpStatus, Inject } from '@nestjs/common';
import { UserRepository } from 'src/app/repository';
import { UserRequestDto } from 'src/app/dto/user-dto';
import { TokenGeneration } from 'src/core/components/TokenGeneration';

export class UserCase {
  constructor(
    @Inject(UserRepository)
    private readonly userRepository: UserRepository
  ) {}

  public async create(user: UserRequestDto) {
    return await this.userRepository
      .create(user)
      .then((result) => result)
      .catch(() => {
        throw new HttpException('Unprocessable Entity', HttpStatus.UNPROCESSABLE_ENTITY);
      });
  }

  public async auth(request: UserRequestDto) {
    return await this.userRepository.findOne(request).then((result) => {
      if (result) {
        const authToken = TokenGeneration.generateToken(result, 1000 * 60 * 60 * 24 * 7);
        return { authToken };
      }
      throw new HttpException('Entity not found', HttpStatus.UNAUTHORIZED);
    });
  }
}
