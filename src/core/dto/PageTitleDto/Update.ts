import { TextProp } from 'src/core/decorators/props';
import { PageTitleRequest } from 'src/app/dto/page-title-dto';

export class PageTitleUpdateDto implements Partial<PageTitleRequest> {
  @TextProp({ required: false })
  title: string;
  @TextProp({ required: false })
  description: string;
  @TextProp({ required: false })
  videoUrl: string;
}
