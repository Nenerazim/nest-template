import { TextProp } from 'src/core/decorators/props';
import { PageTitleRequest } from 'src/app/dto/page-title-dto';

export class PageTitleCreateDto implements PageTitleRequest {
  @TextProp({ required: true })
  title: string;
  @TextProp({ required: true })
  description: string;
  @TextProp({ required: true })
  videoUrl: string;
  @TextProp({ required: true })
  name: string;
}
