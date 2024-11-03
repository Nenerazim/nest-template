import { Module } from '@nestjs/common';
import { ConfigService, ConfigModule as NestConfigModule } from '@nestjs/config';
import { ThrottlerModule, seconds } from '@nestjs/throttler';
import Joi from 'joi';
import { ThrottlerStorageRedisService } from 'nestjs-throttler-storage-redis';
import { RedisConfig } from '../redis-config/redis.config';
import throttlerConfig, { ThrottlerConfig } from './throttler.config';

@Module({
  imports: [
    NestConfigModule.forRoot({
      /** Валидация переменных окружения */
      validationSchema: Joi.object({
        THROTTLE_TTL: Joi.number().default(60),
        THROTTLE_LIMIT: Joi.number().default(20)
      }),
      load: [throttlerConfig],
      isGlobal: true
    }),

    /** Настройки модуля для Rate Limits */
    ThrottlerModule.forRootAsync({
      imports: [NestConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        throttlers: [
          {
            ttl: seconds(configService.get<ThrottlerConfig>('throttler').ttl),
            limit: configService.get<ThrottlerConfig>('throttler').limit
          }
        ],
        storage: new ThrottlerStorageRedisService({
          host: configService.get<RedisConfig>('redis').host,
          port: configService.get<RedisConfig>('redis').port,
          username: configService.get<RedisConfig>('redis').username,
          password: configService.get<RedisConfig>('redis').password
        })
      })
    })
  ]
})
export class ThrottlerConfigModule {}
