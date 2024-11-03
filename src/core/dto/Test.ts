import { User } from 'src/app/model';
import { EmailProps, NameProps, NumberProp } from 'src/core/decorators/props';

export class TestDto implements User {
  @NumberProp()
  id: number;
  @NameProps()
  name: string;
  @EmailProps()
  email: string;
}
