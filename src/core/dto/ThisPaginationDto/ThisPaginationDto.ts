import { NumberProp } from 'src/core/decorators/props';
import { ThisPaginationRequestDto } from 'src/app/dto/shared';

export class ThisPaginationDto implements ThisPaginationRequestDto {
  @NumberProp({ required: false })
  page: number;
  @NumberProp({ required: false })
  limit: number;

  toApi() {
    return {
      page: this.page ?? 1,
      limit: this.limit ?? 12
    };
  }
}
