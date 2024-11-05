import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormModel, SomeListModel, User } from 'src/app/model';
import { PageTitleModel } from 'src/app/model/PageTitleModel';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST,
      port: Number(process.env.MYSQL_PORT),
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      entities: [User, SomeListModel, PageTitleModel, FormModel],
      synchronize: true
    })
  ]
})
export class DatabaseModule {}
