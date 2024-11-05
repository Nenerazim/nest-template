import { TextProp } from 'src/core/decorators/props';
import { SomeListRequest } from 'src/app/dto/some-list-dto';

export class SomeListCreateDto implements SomeListRequest {
  @TextProp({ required: true })
  title: string;
  @TextProp({ required: true })
  description: string;
}
