import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { FormEntity } from 'src/app/dto/formDto';

@Entity()
export class FormModel implements FormEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  email: string;
  @Column()
  massage: string;
}
