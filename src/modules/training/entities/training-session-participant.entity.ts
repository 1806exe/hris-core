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
import { TrainingCurriculum } from './training-curriculum.entity';

@Entity('sessionparticipant', { schema: 'public' })
export class SessionParticipant {
  @Column('integer', {
    nullable: false,
    primary: true,
    name: 'id',
  })
  id: number;

  @Column('character varying', {
    nullable: false,
    length: 13,
    name: 'uid',
  })
  uid: string;

  @Column('integer', {
    nullable: false,
    name: 'trainingsessionId',
    primary: true,
  })
  trainingsessionId: number;

  @Column('integer', {
    nullable: false,
    name: 'recordId',
    primary: true,
  })
  recordId: number;


  @ManyToOne((type) => Record, (record) => record.participants, {})
  record: Record[];


  /*@ManyToOne(
    type => TrainingSession,
    trainingsession => trainingsession.participants,
  )
  trainingSessions: TrainingSession[];*/
}
