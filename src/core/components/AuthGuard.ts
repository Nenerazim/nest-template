import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import { UserRepository } from 'src/app/repository';
import { TokenGeneration } from 'src/core/components/TokenGeneration';
import { UserEntity } from 'src/app/dto/user-dto';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly userRepository: UserRepository) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<FastifyRequest>();

    const authToken = request.cookies?.authToken;
    if (!authToken) {
      throw new UnauthorizedException('Auth token is missing');
    }
    const { name, password } = TokenGeneration.verifyToken<UserEntity>(authToken);

    await this.userRepository
      .findOne({ name, password })
      .then((user) => {
        request['user'] = user;
      })
      .catch(() => {
        throw new UnauthorizedException('Unauthorized');
      });

    return true;
  }
}
