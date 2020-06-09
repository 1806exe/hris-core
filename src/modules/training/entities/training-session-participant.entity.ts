import { Column, Entity, OneToMany, ManyToMany, ManyToOne } from 'typeorm';
import { Record } from '../../../modules/record/entities/record.entity';
import { TrainingSession } from './training-session.entity';

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

  @Column('integer', {
    nullable: false,
    name: 'curriculumid',
  })
  curriculumid: number;

  @Column('boolean', { nullable: false, name: 'certified' })
  certified: boolean;

  @Column('integer', { nullable: false, name: 'certifiedby' })
  certifiedby: number;

  @Column('date', { nullable: false, name: 'certificationdate' })
  certificationdate: Date;

  @Column('boolean', { nullable: false, name: 'assessed' })
  assessed: boolean;

  @Column('integer', { nullable: false, name: 'assessedby' })
  assessedby: number;

  @Column('date', { nullable: false, name: 'assessmentdate' })
  assessmentdate: Date;

  @ManyToOne((type) => Record, (record) => record.participants, { eager: true })
  record: Record[];
  static plural: any = 'participants';

  /*@ManyToOne(
    type => TrainingSession,
    trainingsession => trainingsession.participants,
  )
  trainingSessions: TrainingSession[];*/
}
