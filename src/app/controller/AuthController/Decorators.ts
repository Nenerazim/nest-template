import { applyDecorators, Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DefaultPostAction } from 'src/core/decorators/controller';

export function ControllerDesc() {
  return applyDecorators(ApiTags('Авторизация'), Controller('auth'));
}

export function AuthUser() {
  return applyDecorators(
    DefaultPostAction({
      path: '/',
      summary: 'Получение юзера по id',
      description: 'Роут отдает юзера по id'
    })
  );
}
