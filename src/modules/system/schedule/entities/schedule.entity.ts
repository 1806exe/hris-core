import { Column, Entity, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from 'typeorm';
import { EntityCoreProps } from '../../../../core/entities/entity-core-props';
import { Process } from './process.entity';
@Entity('schedule', { schema: 'public' })
export class Schedule extends EntityCoreProps {
  static plural = 'schedules';

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 256, unique: true })
  uid: string;

  @Column('character varying', {
    nullable: false,
    length: 255,
    unique: true
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

  @ManyToOne(
    type => Process,
    process => process.schedules,
    { eager:true, onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: 'processid' })
  process: Process | null;
}
