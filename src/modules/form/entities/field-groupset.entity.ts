import { Entity, JoinTable, ManyToMany } from 'typeorm';
import { EntityCoreProps } from '../../../core/entities/entity-core-props';
import { FieldGroup } from './field-group.entity';

@Entity('fieldgroupset', { schema: 'public' })
export class FieldGroupSet extends EntityCoreProps {
  static plural = 'fieldGroupSets';

  /**
   * Many To Many Relationship: FieldGroupSet and FieldGroup Entities
   */
  @ManyToMany(
    type => FieldGroup,
    fieldGroup => fieldGroup.fieldGroupSets,
    {
      nullable: false,
      cascade: true,
      eager: true,
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
  )
  @JoinTable({
    name: 'fieldgroupsetmembers',
    joinColumn: { referencedColumnName: 'id' },
    inverseJoinColumn: { referencedColumnName: 'id' },
  })
  fieldGroups: FieldGroup[];
}
