import { ControllerDesc, CreatePageTitle, GetAllPageTitle, GetPageTitle, UpdatePageTitle } from './Decorators';
import { Body, HttpStatus, Inject, Param, Query } from '@nestjs/common';
import { PageTitleCase } from 'src/app/use-cases';
import { ResponseBuilder } from 'src/core/components/ResponseBuilder';
import { PageTitleCreateDto, PageTitleUpdateDto } from 'src/core/dto/PageTitleDto';
import { ThisPaginationDto } from 'src/core/dto/ThisPaginationDto';

@ControllerDesc()
export class PageTitleController {
  constructor(
    @Inject(PageTitleCase)
    private readonly pageTitleCase: PageTitleCase
  ) {}

  @GetAllPageTitle()
  async getAll(@Query() headers: ThisPaginationDto) {
    return this.pageTitleCase
      .findAll(headers.toApi())
      .then(({ data, page, total }) => ResponseBuilder.success().setData(data).setPagination(page, total).build());
  }

  @GetPageTitle()
  async getSomeList(@Param('name') name: string) {
    return this.pageTitleCase.findOne(name).then((response) => ResponseBuilder.success().setData(response).build());
  }

  @CreatePageTitle()
  async createSomeList(@Body() pageTitle: PageTitleCreateDto) {
    return this.pageTitleCase.create(pageTitle).then((response) => ResponseBuilder.success(HttpStatus.CREATED).setData(response).build());
  }

  @UpdatePageTitle()
  async updateSomeList(@Param('name') name: string, @Body() someList: PageTitleUpdateDto) {
    return this.pageTitleCase.update(name, someList).then((response) => ResponseBuilder.success(HttpStatus.OK).setData(response).build());
  }
}
