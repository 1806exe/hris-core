import { EntityCoreProps } from '../../../core/entities/entity-core-props';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  ManyToMany,
} from 'typeorm';

import { FieldOptionMerge } from './field-option-merge.entity';
import { Field } from './field.entity';
import { FieldOptionGroup } from './field-option-group.entity';

@Entity('fieldoption', { schema: 'public' })
export class FieldOption extends EntityCoreProps {
  static plural = 'fieldOptions';

  @Column({ type: 'varchar', length: 64, nullable: true })
  value: string;

  @Column({ type: 'boolean', nullable: true })
  skipInReport: boolean;

  @Column({ type: 'int', nullable: true, name: 'sort' })
  sort: number;

  @Column({ type: 'boolean', nullable: true })
  hasTraining: boolean | null;

  /**
   * One To Many Relationship: Field and FieldOption
   */
  @ManyToOne(
    type => Field,
    field => field.fieldOptions,
  )
  @JoinColumn({ referencedColumnName: 'id' })
  field: Field;

  @OneToMany(
    type => FieldOptionMerge,
    fieldOptionMerge => fieldOptionMerge.mergedFieldOption,
    { onDelete: 'CASCADE' },
  )
  fieldOptionMerges: FieldOptionMerge[];

  /**
   * One To Many Relationship: FieldOption and FieldOptionGroup
   */
  @ManyToMany(
    type => FieldOptionGroup,
    fieldOptionGroup => fieldOptionGroup.fieldOptions,
    { onUpdate: 'CASCADE', onDelete: 'CASCADE' },
  )
  fieldOptionGroups: FieldOptionGroup[];
}
