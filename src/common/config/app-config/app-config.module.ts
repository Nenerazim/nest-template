import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import Joi from 'joi';
import appConfig from './app.config';

@Module({
  imports: [
    NestConfigModule.forRoot({
      cache: process.env.NODE_ENV === 'production',
      /** Валидация переменных окружения */
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid('development', 'production', 'test'),
        PORT: Joi.number().required().messages({
          'any.required': 'Необходимо установить переменную окружения PORT'
        }),
        HOST: Joi.string().required().messages({
          'any.required': 'Необходимо установить переменную окружения HOST'
        })
      }),
      load: [appConfig],
      expandVariables: true
    })
  ]
})
export class AppConfigModule {}
