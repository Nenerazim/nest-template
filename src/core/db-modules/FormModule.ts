import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormModel } from 'src/app/model';
import { FormRepository } from 'src/app/repository';
import { FormCase } from 'src/app/use-cases/FormCase';

@Module({
  imports: [TypeOrmModule.forFeature([FormModel])],
  providers: [FormRepository, FormCase],
  exports: [FormRepository, FormCase]
})
export class FormModule {}
