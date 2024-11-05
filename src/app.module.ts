import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard } from '@nestjs/throttler';
import { CommonModule } from './common';
import { FormModule, SomeListModule, UserModule } from 'src/core/db-modules';
import { SomeListController } from 'src/app/controller/SomeList/Controller';
import { PageTitleModule } from 'src/core/db-modules/PageTitleModule';
import { PageTitleController } from 'src/app/controller/PageTitle/Controller';
import { FormController } from 'src/app/controller/Form/Controller';
import { AuthController } from 'src/app/controller/AuthController/Controller';
import { UserController } from 'src/app/controller/User/Controller';

@Module({
  imports: [CommonModule, UserModule, SomeListModule, PageTitleModule, FormModule],
  controllers: [AuthController, UserController, SomeListController, PageTitleController, FormController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    }
  ]
})
export class AppModule {}
