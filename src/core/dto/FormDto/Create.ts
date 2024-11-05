import { TextProp } from 'src/core/decorators/props';
import { FormRequest } from 'src/app/dto/formDto';

export class FromCreateDto implements FormRequest {
  @TextProp({ required: true })
  email: string;
  @TextProp({ required: true })
  massage: string;
  @TextProp({ required: true })
  name: string;
}
