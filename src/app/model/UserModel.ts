import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from 'src/app/dto/user-dto';

@Entity()
export class User implements UserEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  email: string;
}
