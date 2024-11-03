import { Module } from '@nestjs/common';
import { AppConfigModule } from './app-config';
import { CacheConfigModule } from './cache-config/cache-config.module';
import { RedisConfigModule } from './redis-config/redis-config.module';
import { ThrottlerConfigModule } from './throttler-config/throttler-config.module';
import { DatabaseModule } from './database-config/database.module';

@Module({
  imports: [AppConfigModule, RedisConfigModule, ThrottlerConfigModule, CacheConfigModule, DatabaseModule]
})
export class ConfigModule {}
