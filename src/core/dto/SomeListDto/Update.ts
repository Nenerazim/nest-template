import { TextProp } from 'src/core/decorators/props';
import { SomeListRequest } from 'src/app/dto/some-list-dto';

export class SomeListUpdateDto implements SomeListRequest {
  @TextProp({ required: false })
  title: string;
  @TextProp({ required: false })
  description: string;
}
