import { Entity, JoinColumn, ManyToOne } from 'typeorm';

import { Field } from './field.entity';
import { HRISBaseEntity } from '../../../core/entities/base-entity';

@Entity('fieldrelation', { schema: 'public' })
export class FieldRelation extends HRISBaseEntity {
  static plural = 'fieldRelations';

  /**
   * Many To One Relationship: FieldRelation and Field Entities
   */
  @ManyToOne((type) => Field, (field) => field.parentFieldRelations, {
    primary: true,
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ referencedColumnName: 'id' })
  parentField: Field;

  /**
   * Many To One Relationship: FieldRelation and Field Entities
   */
  @ManyToOne((type) => Field, (field) => field.childFieldRelations, {
    primary: true,
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ referencedColumnName: 'id' })
  childField: Field;
}
