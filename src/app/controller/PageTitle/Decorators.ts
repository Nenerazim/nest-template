import { applyDecorators, Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DefaultDeleteAction, DefaultGetAction, DefaultPostAction, DefaultPutAction, RouteGuard } from 'src/core/decorators/controller';

export function ControllerDesc() {
  return applyDecorators(ApiTags('Тайтл стр'), Controller('page-title'));
}

export function GetAllPageTitle() {
  return applyDecorators(
    DefaultGetAction({
      path: '/',
      summary: 'Получения тайтл стр',
      description: 'Роут отдает тайтл стр'
    })
  );
}

export function CreatePageTitle() {
  return applyDecorators(
    RouteGuard(),
    DefaultPostAction({
      path: '/',
      summary: 'Создание сущности тайтл стр',
      description: 'Роут создает сущность тайстл стр'
    })
  );
}

export function DeletePageTitle() {
  return applyDecorators(
    RouteGuard(),
    DefaultDeleteAction({
      path: '/:id',
      summary: 'Удаление сущности тайтла стр',
      description: 'Роут удаляет сущность какого то листа'
    })
  );
}

export function UpdatePageTitle() {
  return applyDecorators(
    RouteGuard(),
    DefaultPutAction({
      path: '/:id',
      summary: 'Обновление сущности тайтла стр',
      description: 'Роут обновляет сущность тайстла стр'
    })
  );
}

export function GetPageTitle() {
  return applyDecorators(
    DefaultGetAction({
      path: '/:name',
      summary: 'Получение единичной сущности тайтла стр',
      description: 'Роут отдает сущность тайтла стр'
    })
  );
}
