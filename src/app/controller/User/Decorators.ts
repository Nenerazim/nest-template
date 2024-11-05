import { applyDecorators, Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DefaultPostAction } from 'src/core/decorators/controller';

export function ControllerDesc() {
  return applyDecorators(ApiTags('Юзер'), Controller('user'));
}

export function CreateUser() {
  return applyDecorators(
    DefaultPostAction({
      path: '/',
      summary: 'Создание юзера',
      description: 'роут создает юзера'
    })
  );
}
