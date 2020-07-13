import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';

import { FieldOptionGroup } from './field-option-group.entity';
import { EntityCoreProps } from '../../../core/entities/entity-core-props';

@Entity('fieldoptiongroupset', { schema: 'public' })
export class FieldOptionGroupSet extends EntityCoreProps {
  static plural = 'fieldOptionGroupSets';

  /**
   * Many To Many Relationship: FieldOptionGroupSet and FieldOptionGroup Entities
   */
  @ManyToMany(
    type => FieldOptionGroup,
    fieldOptionGroup => fieldOptionGroup.fieldOptionGroupSets,
    {
      nullable: false,
      cascade: true,
      eager: true,
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
  )
  @JoinTable({
    name: 'fieldoptiongroupsetmembers',
    joinColumn: { referencedColumnName: 'id' },
    inverseJoinColumn: { referencedColumnName: 'id' },
  })
  fieldOptionGroups: FieldOptionGroup[];
}
