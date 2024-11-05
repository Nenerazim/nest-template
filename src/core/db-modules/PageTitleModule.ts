import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PageTitleModel } from 'src/app/model';
import { PageTitleRepository } from 'src/app/repository';
import { PageTitleCase } from 'src/app/use-cases';

@Module({
  imports: [TypeOrmModule.forFeature([PageTitleModel])],
  providers: [PageTitleRepository, PageTitleCase],
  exports: [PageTitleRepository, PageTitleCase]
})
export class PageTitleModule {}
