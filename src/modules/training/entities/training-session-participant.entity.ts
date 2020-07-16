import {
  Column,
  Entity,
  OneToMany,
  ManyToMany,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Record } from '../../record/entities/record.entity';
import { TrainingSession } from './training-session.entity';
import { User } from '../../system/user/entities/user.entity';
import { Exclude } from 'class-transformer';
@Entity('sessionparticipant', { schema: 'public' })
export class SessionParticipant {
  @Exclude()
  @Column('integer', {
    nullable: false,
    name: 'trainingsessionId',
    primary: true,
    select: false,
  })
  trainingsessionId: number;

  @Exclude()
  @Column('integer', {
    nullable: false,
    name: 'recordId',
    primary: true,
    select: false,
  })
  recordId: number;

  @Column('boolean', { nullable: false, name: 'certified' })
  certified: boolean;

  @Column('date', { nullable: false, name: 'certificationdate' })
  certificationdate: Date;

  @Column('boolean', { nullable: false, name: 'assessed' })
  assessed: boolean;

  @Column('date', { nullable: false, name: 'assessmentdate' })
  assessmentdate: Date;

  @OneToOne((type) => User)
  @JoinColumn({ name: 'assessedby', referencedColumnName: 'id' })
  assessedby: User;

  @OneToOne((type) => User)
  @JoinColumn({ name: 'certifiedby', referencedColumnName: 'id' })
  certifiedby: User;

  @ManyToOne((type) => Record, (record) => record.participants, {})
  record: Record;

  @OneToOne((type) => TrainingSession)
  @JoinColumn({ name: 'trainingsessionId', referencedColumnName: 'id' })
  session: TrainingSession;
}
