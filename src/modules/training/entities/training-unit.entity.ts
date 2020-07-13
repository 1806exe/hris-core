import { EntityCoreProps } from '../../../core/entities/entity-core-props';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { TrainingCurriculum } from './training-curriculum.entity';
import { TrainingSection } from './training-section.entity';
import { TrainingSession } from './training-session.entity';

@Entity('trainingunit', { schema: 'public' })
export class TrainingUnit extends EntityCoreProps {
  static plural = 'units';
  @Column('integer', {
    nullable: false,
    primary: true,
    name: 'id',
  })
  id: number;

  @ManyToOne(
    type => TrainingSection,
    trainingSection => trainingSection.trainingUnits,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: 'sectionid' })
  section: TrainingSection | null;

  @OneToMany(
    type => TrainingCurriculum,
    trainingCurriculum => trainingCurriculum.unit,
    { onDelete: 'CASCADE' },
  )
  trainingCurriculums: TrainingCurriculum[];
}
