import { EntityCoreProps } from '../../../core/entities/entity-core-props';
import { Column, Entity, OneToMany } from 'typeorm';

import { TrainingCurriculum } from './training-curriculum.entity';
import { TrainingSession } from './training-session.entity';
import { TrainingUnit } from './training-unit.entity';

@Entity('trainingsections', { schema: 'public' })
export class TrainingSection extends EntityCoreProps {
  static plural = 'sections';
  @Column('integer', {
    nullable: false,
    primary: true,
    name: 'id',
  })
  id: number;

  @Column({
    nullable: true,
    name: 'signature',
    type: 'text',
  })
  signature: string;

  @OneToMany(
    (type) => TrainingCurriculum,
    (trainingCurriculum) => trainingCurriculum.section,
    { onDelete: 'CASCADE' },
  )
  curriculums: TrainingCurriculum[];

  @OneToMany((type) => TrainingUnit, (trainingUnit) => trainingUnit.section, {
    onDelete: 'CASCADE',
  })
  trainingUnits: TrainingUnit[];
}
