import { applyDecorators, Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DefaultGetAction, DefaultPostAction } from 'src/core/decorators/controller';

export function ControllerDesc() {
  return applyDecorators(ApiTags('Общие данные'), Controller('initial'));
}

export function Test() {
  return applyDecorators(
    DefaultPostAction({
      path: '/test',
      summary: 'test',
      description: 'test'
    })
  );
}

export function Test2() {
  return applyDecorators(
    DefaultGetAction({
      path: '/test',
      summary: 'test',
      description: 'test'
    })
  );
}
