import { User } from 'src/app/model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userModel: Repository<User>
  ) {}

  public async create(user: User) {
    const newUser = this.userModel.create(user);
    return await this.userModel.save(newUser);
  }

  public async findAll() {
    return this.userModel.find();
  }
}
