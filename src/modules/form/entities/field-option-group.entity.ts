import { EntityCoreProps } from '../../../core/entities/entity-core-props';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
} from 'typeorm';

import { FieldOption } from './field-option.entity';
import { Field } from './field.entity';
import { FieldOptionGroupSet } from './field-option-group-set.entity';

@Entity('fieldoptiongroup', { schema: 'public' })
export class FieldOptionGroup extends EntityCoreProps {
  static plural = 'fieldOptionGroups';

  @ManyToOne(
    type => Field,
    field => field.fieldOptionGroups,
    {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
  )
  @JoinColumn({ referencedColumnName: 'id' })
  field: Field | null;

  @Column({
    type: 'varchar',
    nullable: true,
    length: 64,
    default: () => 'NULL::varchar',
  })
  operator: string;

  /**
   * Many To Many Relationship: FieldOptionGroup and FieldOption Entities
   */
  @ManyToMany(
    type => FieldOption,
    fieldOption => fieldOption.fieldOptionGroups,
    {
      nullable: false,
      cascade: true,
      eager: true,
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
  )
  @JoinTable({
    name: 'fieldoptiongroupmembers',
    joinColumn: { referencedColumnName: 'id' },
    inverseJoinColumn: { referencedColumnName: 'id' },
  })
  fieldOptions: FieldOption[];

  /**
   * Many To Many Relationship: FieldOptionGroup and FieldOptionGroupSet Entities
   */
  @ManyToMany(
    type => FieldOptionGroupSet,
    fieldOptionGroupSet => fieldOptionGroupSet.fieldOptionGroups,
    { nullable: false, onUpdate: 'CASCADE', onDelete: 'CASCADE' },
  )
  fieldOptionGroupSets: FieldOptionGroupSet[];
}
