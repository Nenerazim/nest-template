import { applyDecorators, Delete, Get, HttpCode, HttpStatus, Patch, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export function DefaultExceptions() {
  return applyDecorators(
    ApiResponse({
      status: 400,
      description: 'Ошибка валидации'
    }),
    ApiResponse({
      status: 429,
      description: 'Превышено допустимое кол-во запросов'
    })
  );
}

export function CreatedResponse() {
  return applyDecorators(HttpCode(HttpStatus.CREATED), ApiResponse({ status: 201, description: 'Создание прошло успешно' }));
}

export function OkResponse() {
  return applyDecorators(HttpCode(HttpStatus.OK), ApiResponse({ status: 200, description: 'Запрос прошел успешно' }));
}

export function NoContentResponse() {
  return applyDecorators(HttpCode(HttpStatus.NO_CONTENT), ApiResponse({ status: 204, description: 'Запрос прошел успешно' }));
}
interface DefaultActionData {
  path: string;
  summary: string;
  description: string;
}

export function DefaultPostAction(data?: DefaultActionData) {
  return applyDecorators(
    Post(data.path),
    ApiOperation({
      summary: data.summary,
      description: data?.description
    }),
    CreatedResponse(),
    DefaultExceptions()
  );
}

export function DefaultPatchAction(data: DefaultActionData) {
  return applyDecorators(
    Patch(data.path),
    ApiOperation({
      summary: data.summary,
      description: data?.description
    }),
    OkResponse(),
    DefaultExceptions()
  );
}

export function DefaultDeleteAction(data: DefaultActionData) {
  return applyDecorators(
    Delete(data.path),
    ApiOperation({
      summary: data.summary,
      description: data?.description
    }),
    NoContentResponse(),
    DefaultExceptions()
  );
}

export function DefaultGetAction(data: DefaultActionData) {
  return applyDecorators(
    Get(data.path),
    ApiOperation({
      summary: data.summary,
      description: data?.description
    }),
    OkResponse(),
    DefaultExceptions()
  );
}

export function DefaultPutAction(data: DefaultActionData) {
  return applyDecorators(
    Put(data.path),
    ApiOperation({
      summary: data.summary,
      description: data?.description
    }),
    OkResponse(),
    DefaultExceptions()
  );
}
