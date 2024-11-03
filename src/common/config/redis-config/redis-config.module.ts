import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import Joi from 'joi';
import redisConfig from './redis.config';

@Module({
  imports: [
    NestConfigModule.forRoot({
      cache: process.env.NODE_ENV === 'production',

      /** Валидация переменных окружения */
      validationSchema: Joi.object({
        REDIS_HOST: Joi.string().required().messages({
          'any.required': 'Необходимо установить переменную окружения REDIS_HOST'
        }),
        REDIS_PORT: Joi.number().required().messages({
          'any.required': 'Необходимо установить переменную окружения REDIS_PORT'
        }),
        REDIS_USERNAME: Joi.string().allow(''),
        REDIS_PASSWORD: Joi.string().allow('')
      }),
      load: [redisConfig]
    })
  ]
})
export class RedisConfigModule {}
