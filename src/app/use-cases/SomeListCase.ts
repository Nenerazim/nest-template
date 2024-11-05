import { HttpException, HttpStatus, Inject } from '@nestjs/common';
import { SomeListRepository } from 'src/app/repository';
import { SomeListRequest } from 'src/app/dto/some-list-dto';
import { ThisPaginationRequestDto } from 'src/app/dto/shared';

export class SomeListCase {
  constructor(
    @Inject(SomeListRepository)
    private readonly someListRepository: SomeListRepository
  ) {}

  public async create(SomeList: SomeListRequest) {
    return await this.someListRepository
      .create(SomeList)
      .then((result) => result)
      .catch(() => {
        throw new HttpException('Unprocessable Entity', HttpStatus.UNPROCESSABLE_ENTITY);
      });
  }

  public async update(id: number, SomeList: Partial<SomeListRequest>) {
    return await this.someListRepository
      .update(id, SomeList)
      .then((result) => {
        if (result.affected === 0) {
          throw new HttpException('Record not found', HttpStatus.NOT_FOUND);
        }
        return this.someListRepository.findOne(id);
      })
      .catch(() => {
        throw new HttpException('Unprocessable Entity', HttpStatus.UNPROCESSABLE_ENTITY);
      });
  }

  public async delete(id: number) {
    return await this.someListRepository.delete(id).then((result) => {
      if (result.affected === 0) {
        throw new HttpException('Record not found', HttpStatus.NOT_FOUND);
      }
    });
  }

  public async findOne(id: number) {
    const result = await this.someListRepository.findOne(id);
    if (result) {
      return result;
    }
    throw new HttpException('Entity not found', HttpStatus.NOT_FOUND);
  }

  public async findAll(request: ThisPaginationRequestDto) {
    return await this.someListRepository.findAllWithPagination(request).then((result) => result);
  }
}
