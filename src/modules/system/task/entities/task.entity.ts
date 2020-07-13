import { Column, Entity, PrimaryGeneratedColumn, Generated } from 'typeorm';
import { EntityCoreProps } from '../../../../core/entities/entity-core-props';

@Entity('task', { schema: 'public' })
export class Task extends EntityCoreProps {
  static plural = 'tasks';

  @PrimaryGeneratedColumn()
  id: number;

  @Generated()
  uid: string;

  @Column({
    nullable: false,
    length: 255
  })
  name: string;

  @Column({
    type:'jsonb',
    nullable: false,
  })
  log: any;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 255,
  })
  status: string;

  @Column({
    type: Date,
    nullable: false,
  })
  startedat: Date | null;

  @Column({
    nullable: false,
    type: Date,
  })
  endedat: Date | null;
}
