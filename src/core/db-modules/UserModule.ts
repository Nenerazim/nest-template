import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/app/model';
import { UserRepository } from 'src/app/repository/UserRepository';
import { UserCase } from 'src/app/use-cases';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserRepository, UserCase],
  exports: [UserRepository, UserCase]
})
export class UserModule {}
