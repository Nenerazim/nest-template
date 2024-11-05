import { ControllerDesc, CreateSomeList, DeleteSomeList, GetAllSomeList, GetSomeList, UpdateSomeList } from './Decorators';
import { Body, HttpStatus, Inject, Param, Query } from '@nestjs/common';
import { SomeListCase } from 'src/app/use-cases';
import { ResponseBuilder } from 'src/core/components/ResponseBuilder';
import { SomeListCreateDto, SomeListUpdateDto } from 'src/core/dto/SomeListDto';
import { ThisPaginationDto } from 'src/core/dto/ThisPaginationDto';

@ControllerDesc()
export class SomeListController {
  constructor(
    @Inject(SomeListCase)
    private readonly someListCase: SomeListCase
  ) {}

  @GetAllSomeList()
  async getAll(@Query() headers: ThisPaginationDto) {
    return this.someListCase
      .findAll(headers.toApi())
      .then(({ data, total, page }) => ResponseBuilder.success().setData(data).setPagination(page, total).build());
  }

  @GetSomeList()
  async getSomeList(@Param('id') id: number) {
    return this.someListCase.findOne(id).then((response) => ResponseBuilder.success().setData(response).build());
  }

  @DeleteSomeList()
  async deleteSomeList(@Param('id') id: number) {
    return this.someListCase.delete(id).then(() => ResponseBuilder.success(HttpStatus.NO_CONTENT).build());
  }

  @CreateSomeList()
  async createSomeList(@Body() someList: SomeListCreateDto) {
    return this.someListCase.create(someList).then((response) => ResponseBuilder.success(HttpStatus.CREATED).setData(response).build());
  }

  @UpdateSomeList()
  async updateSomeList(@Param('id') id: number, @Body() someList: SomeListUpdateDto) {
    return this.someListCase.update(id, someList).then((response) => ResponseBuilder.success(HttpStatus.OK).setData(response).build());
  }
}
