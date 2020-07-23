import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';

import { FieldOptionGroup } from './field-option-group.entity';
import { EntityCoreProps } from '../../../core/entities/entity-core-props';

@Entity('fieldoptiongroupset', { schema: 'public' })
export class FieldOptionGroupSet extends EntityCoreProps {
  static plural = 'fieldOptionGroupSets';

  @Column('integer', {
    nullable: false,
    primary: true,
    name: 'fieldoptiongroupsetid',
  })
  id: number;

  @ManyToMany(
    (type) => FieldOptionGroup,
    (fieldOptionGroup) => fieldOptionGroup.fieldOptionGroupSets,
    { nullable: false },
  )
  @JoinTable({ name: 'fieldoptiongroupsetmembers' })
  fieldOptionGroups: FieldOptionGroup[];
}
