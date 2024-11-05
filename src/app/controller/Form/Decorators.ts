import { applyDecorators, Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DefaultGetAction, DefaultPostAction, RouteGuard } from 'src/core/decorators/controller';

export function ControllerDesc() {
  return applyDecorators(ApiTags('Формы'), Controller('form'));
}

export function GetAllForm() {
  return applyDecorators(
    RouteGuard(),
    DefaultGetAction({
      path: '/',
      summary: 'Получение всех формы',
      description: 'Роут отдает все формы'
    })
  );
}

export function CreateForm() {
  return applyDecorators(
    DefaultPostAction({
      path: '/',
      summary: 'Создание формы',
      description: 'Роут создает форму'
    })
  );
}
