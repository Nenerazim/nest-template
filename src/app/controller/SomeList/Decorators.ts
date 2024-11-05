import { applyDecorators, Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DefaultDeleteAction, DefaultGetAction, DefaultPostAction, DefaultPutAction, RouteGuard } from 'src/core/decorators/controller';

export function ControllerDesc() {
  return applyDecorators(ApiTags('Какой то лис'), Controller('some-list'));
}

export function GetAllSomeList() {
  return applyDecorators(
    DefaultGetAction({
      path: '/',
      summary: 'Получения всего листа',
      description: 'Роут отдает какой то лист'
    })
  );
}

export function CreateSomeList() {
  return applyDecorators(
    RouteGuard(),
    DefaultPostAction({
      path: '/',
      summary: 'Создание сущности какого то листа',
      description: 'Роут создает сущность какого то листа'
    })
  );
}

export function DeleteSomeList() {
  return applyDecorators(
    RouteGuard(),
    DefaultDeleteAction({
      path: '/:id',
      summary: 'Удаление сущности какого то листа',
      description: 'Роут удаляет сущность какого то листа'
    })
  );
}

export function UpdateSomeList() {
  return applyDecorators(
    RouteGuard(),
    DefaultPutAction({
      path: '/:id',
      summary: 'Обновление сущности какого то листа',
      description: 'Роут обновляет сущность какого то листа'
    })
  );
}

export function GetSomeList() {
  return applyDecorators(
    DefaultGetAction({
      path: '/:id',
      summary: 'Получение единичной сущности какого то листа',
      description: 'Роут отдает сущность какого то листа'
    })
  );
}
