import { Entity, JoinTable, ManyToMany } from 'typeorm';
import { EntityCoreProps } from '../../../core/entities/entity-core-props';
import { FieldGroupSet } from './field-groupset.entity';
import { Field } from './field.entity';

@Entity('fieldgroup', { schema: 'public' })
export class FieldGroup extends EntityCoreProps {
  static plural = 'fieldGroups';

  /**
   * Many To Many Relationship: FieldGroup and Field Entities
   */
  @ManyToMany((type) => Field, (field) => field.fieldGroups, {
    nullable: false,
  })
  @JoinTable({
    name: 'fieldgroupmembers',
    joinColumn: { referencedColumnName: 'id' },
    inverseJoinColumn: { referencedColumnName: 'id' },
  })
  fields: Field[];

  /**
   * Many To Many Relationship: FieldGroup and FieldGroupSet Entities
   */
  @ManyToMany(
    (type) => FieldGroupSet,
    (fieldGroupSet) => fieldGroupSet.fieldGroups,
  )
  fieldGroupSets: FieldGroupSet[];
}
