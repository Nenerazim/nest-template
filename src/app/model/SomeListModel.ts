import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { SomeListEntity } from 'src/app/dto/some-list-dto';

@Entity()
export class SomeListModel implements SomeListEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;
  @Column()
  description: string;
}
