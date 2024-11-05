import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SomeListModel } from 'src/app/model';
import { SomeListRepository } from 'src/app/repository';
import { SomeListCase } from 'src/app/use-cases';

@Module({
  imports: [TypeOrmModule.forFeature([SomeListModel])],
  providers: [SomeListRepository, SomeListCase],
  exports: [SomeListRepository, SomeListCase]
})
export class SomeListModule {}
