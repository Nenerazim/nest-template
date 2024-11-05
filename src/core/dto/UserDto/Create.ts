import { EmailProps, NameProps } from 'src/core/decorators/props';
import { UserRequestDto } from 'src/app/dto/user-dto';

export class UserCreateDto implements UserRequestDto {
  @NameProps()
  name: string;
  @EmailProps()
  password: string;
}
