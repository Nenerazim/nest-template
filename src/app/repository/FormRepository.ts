import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FormModel } from 'src/app/model';
import { ThisPaginationRequestDto } from 'src/app/dto/shared';
import { FormRequest } from 'src/app/dto/formDto';

export class FormRepository {
  constructor(
    @InjectRepository(FormModel)
    private readonly formModel: Repository<FormModel>
  ) {}

  public async create(form: FormRequest) {
    const newForm = this.formModel.create(form);
    return this.formModel.save(newForm);
  }

  public async findAllWithPagination(request: ThisPaginationRequestDto) {
    const { limit, page } = request;
    const [data, total] = await this.formModel.findAndCount({
      take: limit,
      skip: (page - 1) * limit
    });

    return {
      data,
      total,
      page
    };
  }
}
