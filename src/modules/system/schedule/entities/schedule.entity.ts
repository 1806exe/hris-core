import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { EntityCoreProps } from '../../../../core/entities/entity-core-props';
import { Process } from './process.entity';
@Entity('schedule', { schema: 'public' })
export class Schedule extends EntityCoreProps {
  static plural = 'schedules';

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
    unique: true,
  })
  name: string;

  @Column('character varying', {
    nullable: false,
    length: 255,
  })
  type: string;

  @Column('character varying', {
    nullable: false,
    length: 255,
  })
  cron: string;

  @ManyToOne((type) => Process, (process) => process.schedules, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'processid' })
  process: Process | null;
}
