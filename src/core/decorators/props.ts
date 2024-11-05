import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsOptional, IsUUID, MaxLength, MinLength } from 'class-validator';

export interface DefaultDecoratorProps {
  name?: string;
  description?: string;
  required?: boolean;
}

export function TitleProp(props?: DefaultDecoratorProps) {
  const isRequired = props?.required ?? false;
  return applyDecorators(
    ApiProperty({
      description: props?.description ?? 'Заголовок',
      example: 'Разбор закона',
      type: String,
      required: isRequired
    }),
    MaxLength(400, {
      message: 'Поле title может быть не более 400 символов'
    }),
    MinLength(1, {
      message: 'Поле title не может быть меньше 1 символа'
    }),
    !isRequired ? IsOptional() : IsNotEmpty()
  );
}

export function UidArrayProp(props?: DefaultDecoratorProps) {
  const isRequired = props?.required ?? false;
  return applyDecorators(
    ApiProperty({
      description: props?.description ?? 'Массив uuid',
      example: ['eb9f0bff-9a64-4d4e-9dc9-eabdba018907'],
      required: isRequired,
      type: () => Array<string>
    }),
    IsUUID('4', {
      message: 'Элементы массива могут содержать только валидный UUID',
      each: true
    }),
    !isRequired ? IsOptional() : IsNotEmpty()
  );
}

export function UidProp(props?: DefaultDecoratorProps) {
  const isRequired = props?.required ?? false;
  return applyDecorators(
    ApiProperty({
      description: props?.description ?? 'UUID',
      example: 'eb9f0bff-9a64-4d4e-9dc9-eabdba018907',
      type: String,
      required: isRequired
    }),
    IsUUID('4', {
      message: 'Поле может содержать только валидный UUID'
    }),
    !isRequired ? IsOptional() : IsNotEmpty()
  );
}

export function UrlProp(props?: DefaultDecoratorProps) {
  const isRequired = props?.required ?? false;
  return applyDecorators(
    ApiProperty({
      description: props?.description ?? 'Ссылка',
      example: 'https://link.ru',
      type: String,
      required: isRequired
    }),
    MaxLength(400, {
      message: `Поле не может быть более 400 символов`
    }),
    isRequired
      ? MinLength(1, {
          message: `Поле не может быть меньше 1 символа`
        })
      : MinLength(0, {
          message: ``
        }),
    !isRequired ? IsOptional() : IsNotEmpty()
  );
}

export function DateProp(props?: DefaultDecoratorProps) {
  const isRequired = props?.required ?? true;
  return applyDecorators(
    ApiProperty({
      description: props?.description ?? 'Дата',
      required: isRequired,
      example: '2024-05-16T17:11:00Z',
      type: String
    }),
    IsDateString(),
    !isRequired ? IsOptional() : IsNotEmpty()
  );
}

export function DurationProp(props?: DefaultDecoratorProps) {
  const isRequired = props?.required ?? true;
  return applyDecorators(
    ApiProperty({
      description: props?.description ?? 'Продолжительность в секундах',
      example: 3600,
      required: isRequired
    }),
    !isRequired ? IsOptional() : IsNotEmpty()
  );
}

export function DescriptionProp(props?: DefaultDecoratorProps) {
  const isRequired = props?.required ?? true;
  return applyDecorators(
    ApiProperty({
      name: 'description',
      description: props?.description ?? 'Описание',
      type: String,
      required: isRequired
    }),
    !isRequired ? IsOptional() : IsNotEmpty()
  );
}

export function TextProp(props?: DefaultDecoratorProps) {
  const isRequired = props?.required ?? false;
  return applyDecorators(
    ApiProperty({
      description: props?.description ?? 'Текст',
      type: String,
      required: isRequired
    }),
    !isRequired ? IsOptional() : IsNotEmpty()
  );
}

export function NumberProp(props?: DefaultDecoratorProps) {
  const isRequired = props?.required ?? false;
  return applyDecorators(
    ApiProperty({
      description: props?.description ?? 'Количество',
      type: Number,
      required: isRequired
    }),
    !isRequired ? IsOptional() : IsNotEmpty()
  );
}

export function BooleanProp(props?: DefaultDecoratorProps) {
  const isRequired = props?.required ?? false;
  return applyDecorators(
    ApiProperty({
      description: props?.description ?? '',
      type: Boolean,
      required: isRequired
    }),
    !isRequired ? IsOptional() : IsNotEmpty()
  );
}

export function NameProps(props?: DefaultDecoratorProps) {
  const isRequired = props?.required ?? false;
  return applyDecorators(
    ApiProperty({
      name: 'name',
      example: 'name',
      required: isRequired
    }),
    !isRequired ? IsOptional() : IsNotEmpty()
  );
}

export function EmailProps(props?: DefaultDecoratorProps) {
  const isRequired = props?.required ?? false;
  return applyDecorators(
    ApiProperty({
      name: 'password',
      example: 'password',
      required: isRequired
    }),
    !isRequired ? IsOptional() : IsNotEmpty()
  );
}
