import { Column, Entity, ManyToOne } from 'typeorm';
import { Record } from '../../record/entities/record.entity';

@Entity('sessionfacilitator', { schema: 'public' })
export class SessionFacilitator {
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

  @ManyToOne((type) => Record, (record) => record.facilitators)
  record: Record[];

  /*@ManyToOne(type => TrainingSession, trainingsession => trainingsession.facilitators)
  trainingSession: TrainingSession[]*/
}
