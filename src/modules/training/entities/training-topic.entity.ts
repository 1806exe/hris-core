import { EntityCoreProps } from '../../../core/entities/entity-core-props';
import { Column, Entity, ManyToMany, JoinTable } from 'typeorm';

import { TrainingCurriculum } from './training-curriculum.entity';
import { TrainingSession } from './training-session.entity';

@Entity('trainingtopic', { schema: 'public' })
export class TrainingTopic extends EntityCoreProps {
  static plural = 'topics';
  @Column('integer', {
    nullable: false,
    primary: true,
    name: 'id',
  })
  id: number;

  @ManyToMany(
    type => TrainingCurriculum,
    trainingCurriculum => trainingCurriculum.trainingTopics,
  )
  @JoinTable({ name: 'trainingcurriculumtopicmember' })
  curriculums: TrainingCurriculum[];

  @ManyToMany(
    type => TrainingSession,
    trainingSession => trainingSession.topics,
  )
  trainingSessions: TrainingSession[];
}
