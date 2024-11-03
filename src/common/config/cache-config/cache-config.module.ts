import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigService, ConfigModule as NestConfigModule } from '@nestjs/config';
import { redisStore } from 'cache-manager-ioredis-yet';
import { RedisConfig } from '../redis-config/redis.config';

@Module({
  imports: [
    /** Настройки модуля для работы с кешированием */
    CacheModule.registerAsync({
      imports: [NestConfigModule],
      inject: [ConfigService],
      isGlobal: true,
      useFactory: async (configService: ConfigService) => ({
        store: await redisStore({
          host: configService.get<RedisConfig>('redis').host,
          port: configService.get<RedisConfig>('redis').port,
          username: configService.get<RedisConfig>('redis').username,
          password: configService.get<RedisConfig>('redis').password
        })
      })
    })
  ]
})
export class CacheConfigModule {}
