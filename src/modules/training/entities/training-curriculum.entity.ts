import { EntityCoreProps } from '../../../core/entities/entity-core-props';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { TrainingTopic } from './training-topic.entity';
import { TrainingSection } from './training-section.entity';
import { TrainingSession } from './training-session.entity';
import { TrainingUnit } from './training-unit.entity';
import { SessionParticipant } from './training-session-participant.entity';

@Entity('trainingcurriculum', { schema: 'public' })
export class TrainingCurriculum extends EntityCoreProps {
  static plural = 'curriculums';
  @PrimaryGeneratedColumn({
    name: 'id',
  })
  id: number;

  @ManyToOne(
    (type) => TrainingSection,
    (trainingSection) => trainingSection.curriculums,
    { eager: true, onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: 'sectionid' })
  section: TrainingSection | null;

  @ManyToOne(
    (type) => TrainingUnit,
    (trainingUnit) => trainingUnit.trainingCurriculums,
    { eager: true, onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: 'unitid' })
  unit: TrainingUnit | null;

  @Column('boolean', {
    nullable: true,
    name: 'allmethodsselected',
  })
  allMethodsSelected: boolean | null;

  @OneToMany(
    (type) => TrainingSession,
    (trainingSession) => trainingSession.curriculum,
    { onDelete: 'CASCADE' },
  )
  trainingSessions: TrainingSession[];

  @ManyToMany(
    (type) => TrainingTopic,
    (trainingMethod) => trainingMethod.curriculums,
    { nullable: false, eager: true },
  )

  // @JoinTable({ name: 'trainingcurriculumtopicmember' })
  trainingTopics: TrainingTopic[];
}
