import { HttpException, HttpStatus, Inject } from '@nestjs/common';
import { PageTitleRepository } from 'src/app/repository';
import { PageTitleRequest } from 'src/app/dto/page-title-dto';
import { ThisPaginationRequestDto } from 'src/app/dto/shared';

export class PageTitleCase {
  constructor(
    @Inject(PageTitleRepository)
    private readonly pageTitleRepository: PageTitleRepository
  ) {}

  public async create(pageTitle: PageTitleRequest) {
    return await this.pageTitleRepository
      .create(pageTitle)
      .then((result) => result)
      .catch((e) => {
        console.log(e);
        throw new HttpException('Unprocessable Entity', HttpStatus.UNPROCESSABLE_ENTITY);
      });
  }

  public async update(name: string, pageTitle: Partial<PageTitleRequest>) {
    return await this.pageTitleRepository
      .update(name, pageTitle)
      .then((result) => {
        if (result.affected === 0) {
          throw new HttpException('Record not found', HttpStatus.NOT_FOUND);
        }
        return this.pageTitleRepository.findOne(name);
      })
      .catch(() => {
        throw new HttpException('Unprocessable Entity', HttpStatus.UNPROCESSABLE_ENTITY);
      });
  }

  public async delete(name: string) {
    return await this.pageTitleRepository.delete(name).then((result) => {
      if (result.affected === 0) {
        throw new HttpException('Record not found', HttpStatus.NOT_FOUND);
      }
    });
  }

  public async findOne(name: string) {
    const result = await this.pageTitleRepository.findOne(name);
    if (result) {
      return result;
    }
    throw new HttpException('Entity not found', HttpStatus.NOT_FOUND);
  }

  public async findAll(request: ThisPaginationRequestDto) {
    return await this.pageTitleRepository.findAllWithPagination(request).then((result) => result);
  }
}
