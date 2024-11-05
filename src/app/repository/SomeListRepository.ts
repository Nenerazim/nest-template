import { InjectRepository } from '@nestjs/typeorm';
import { SomeListModel } from 'src/app/model';
import { Repository } from 'typeorm';
import { SomeListRequest } from 'src/app/dto/some-list-dto/request';
import { ThisPaginationRequestDto } from 'src/app/dto/shared';

export class SomeListRepository {
  constructor(
    @InjectRepository(SomeListModel)
    private readonly someListModel: Repository<SomeListModel>
  ) {}

  public async create(SomeList: SomeListRequest) {
    const newSomeList = this.someListModel.create(SomeList);
    return this.someListModel.save(newSomeList);
  }

  public async update(id: number, SomeList: Partial<SomeListRequest>) {
    return this.someListModel.update(id, SomeList);
  }

  public async delete(id: number) {
    return this.someListModel.delete(id);
  }

  public async findAll() {
    return this.someListModel.find();
  }

  public async findOne(id: number) {
    return this.someListModel.findOneBy({ id });
  }

  public async findAllWithPagination(request: ThisPaginationRequestDto) {
    const { limit, page } = request;
    const [data, total] = await this.someListModel.findAndCount({
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
