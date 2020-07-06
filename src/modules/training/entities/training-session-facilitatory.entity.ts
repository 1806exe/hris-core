import { Column, Entity, ManyToOne } from 'typeorm';
import { Record } from '../../record/entities/record.entity';

@Entity('sessionfacilitator', { schema: 'public' })
export class SessionFacilitator {
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
  })
  trainingsessionId: number;

  @Column('integer', {
    nullable: false,
    name: 'recordId',
  })
  recordId: number;


  @ManyToOne(type => Record, record => record.facilitators)
  record: Record[]

  /*@ManyToOne(type => TrainingSession, trainingsession => trainingsession.facilitators)
  trainingSession: TrainingSession[]*/
}
