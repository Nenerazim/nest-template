import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PageTitleModel } from 'src/app/model';
import { PageTitleRequest } from 'src/app/dto/page-title-dto';
import { ThisPaginationRequestDto } from 'src/app/dto/shared';

export class PageTitleRepository {
  constructor(
    @InjectRepository(PageTitleModel)
    private readonly pageTitleModel: Repository<PageTitleModel>
  ) {}

  public async create(SomeList: PageTitleRequest) {
    const newSomeList = this.pageTitleModel.create(SomeList);
    return this.pageTitleModel.save(newSomeList);
  }

  public async update(name: string, pageTitle: Partial<PageTitleRequest>) {
    return this.pageTitleModel.update(name, pageTitle);
  }

  public async delete(name: string) {
    return this.pageTitleModel.delete(name);
  }

  public async findAll() {
    return this.pageTitleModel.find();
  }

  public async findOne(name: string) {
    return this.pageTitleModel.findOneBy({ name });
  }

  public async findAllWithPagination(request: ThisPaginationRequestDto) {
    const { limit, page } = request;
    const [data, total] = await this.pageTitleModel.findAndCount({
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
