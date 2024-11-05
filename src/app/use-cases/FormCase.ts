import { HttpException, HttpStatus, Inject } from '@nestjs/common';
import { ThisPaginationRequestDto } from 'src/app/dto/shared';
import { FormRepository } from 'src/app/repository';
import { FormRequest } from 'src/app/dto/formDto';

export class FormCase {
  constructor(
    @Inject(FormRepository)
    private readonly formRepository: FormRepository
  ) {}

  public async create(form: FormRequest) {
    return await this.formRepository
      .create(form)
      .then((result) => result)
      .catch((e) => {
        console.log(e);
        throw new HttpException('Unprocessable Entity', HttpStatus.UNPROCESSABLE_ENTITY);
      });
  }

  public async findAll(request: ThisPaginationRequestDto) {
    return await this.formRepository.findAllWithPagination(request).then((result) => result);
  }
}
