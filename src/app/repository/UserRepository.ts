import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/app/model';
import { UserRequestDto } from 'src/app/dto/user-dto';

export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  public async create(user: UserRequestDto) {
    const newUser = this.userRepository.create(user);
    return this.userRepository.save(newUser);
  }

  public async findOne(request: UserRequestDto) {
    return this.userRepository.findOneBy(request);
  }
}
