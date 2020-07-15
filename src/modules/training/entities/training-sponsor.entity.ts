import { EntityCoreProps } from '../../../core/entities/entity-core-props';
import { Column, Entity, OneToMany } from 'typeorm';

import { TrainingSession } from './training-session.entity';

@Entity('trainingsponsor', { schema: 'public' })
export class TrainingSponsor extends EntityCoreProps {
  static plural = 'sponsors';
  @Column('integer', {
    nullable: false,
    primary: true,
    name: 'id',
  })
  id: number;

  @Column('character varying', {
    nullable: true,
    length: 255,
    name: 'phone',
  })
  phone: string | null;

  @Column('character varying', {
    nullable: true,
    length: 255,
    name: 'name',
  })
  name: string | null;

  @Column('character varying', {
    nullable: true,
    length: 255,
    name: 'email',
  })
  email: string | null;

  @Column('character varying', {
    nullable: true,
    length: 255,
    name: 'box',
  })
  box: string | null;

  @OneToMany(
    type => TrainingSession,
    trainingSession => trainingSession.organiser,
    { onDelete: 'CASCADE' },
  )
  organiserTrainingSessions: TrainingSession[];

  @OneToMany(
    type => TrainingSession,
    trainingSession => trainingSession.sponsor,
    { onDelete: 'CASCADE' },
  )
  sponsorTrainingSessions: TrainingSession[];

  @OneToMany(
    type => TrainingSession,
    trainingSession => trainingSession.topics,
  )
  trainingSessions: TrainingSession[];
}
