import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard } from '@nestjs/throttler';
import { CommonModule } from './common';
import { AppDataController } from 'src/app/controller/App/Controller';
import { UserModule } from 'src/core/db-modules/user-module';

@Module({
  imports: [CommonModule, UserModule],
  controllers: [AppDataController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    }
  ]
})
export class AppModule {}
