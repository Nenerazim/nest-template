import { ControllerDesc, CreateForm, GetAllForm } from './Decorators';
import { Body, HttpStatus, Inject, Query } from '@nestjs/common';
import { ResponseBuilder } from 'src/core/components/ResponseBuilder';
import { ThisPaginationDto } from 'src/core/dto/ThisPaginationDto';
import { FromCreateDto } from 'src/core/dto/FormDto';
import { FormCase } from 'src/app/use-cases/FormCase';

@ControllerDesc()
export class FormController {
  constructor(
    @Inject(FormCase)
    private readonly formCase: FormCase
  ) {}

  @GetAllForm()
  async getAll(@Query() headers: ThisPaginationDto) {
    return this.formCase
      .findAll(headers.toApi())
      .then(({ data, page, total }) => ResponseBuilder.success().setData(data).setPagination(page, total).build());
  }

  @CreateForm()
  async createSomeList(@Body() form: FromCreateDto) {
    return this.formCase
      .create(form)
      .then((response) => ResponseBuilder.success(HttpStatus.CREATED).setData(`Thank you for your interest, ${response.name}`).build());
  }
}
