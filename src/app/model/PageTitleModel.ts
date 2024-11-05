import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { PageTitleEntity } from 'src/app/dto/page-title-dto';

@Entity()
export class PageTitleModel implements PageTitleEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  title: string;
  @Column()
  description: string;
  @Column()
  videoUrl: string;
}
