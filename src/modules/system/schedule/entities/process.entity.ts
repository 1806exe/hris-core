import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { EntityCoreProps } from '../../../../core/entities/entity-core-props';
import { Schedule } from './schedule.entity';
@Entity('process', { schema: 'public' })
export class Process extends EntityCoreProps {
  static plural = 'processes';

  @PrimaryGeneratedColumn()
  id: number;

  @Column('char', {
    nullable: true,
    length: 13,
    name: 'uid',
  })
  uid: string;

  @Column('character varying', {
    nullable: false,
    length: 255,
  })
  name: string;

  @Column('character varying', {
    nullable: false,
    length: 255,
  })
  description: string;

  @Column('text', {
    nullable: false,
  })
  code: string;

  @OneToMany((type) => Schedule, (schedule) => schedule.process, {
    onDelete: 'CASCADE',
  })
  schedules: Schedule[];
}
