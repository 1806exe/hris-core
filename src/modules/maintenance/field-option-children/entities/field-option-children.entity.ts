import { Entity, JoinColumn, ManyToOne } from 'typeorm';

import { FieldOption } from '../../field-option/entities/field-option.entity';
import { EntityCoreProps } from 'src/core/entities/entity-core-props';

@Entity('fieldoptionchildren', { schema: 'public' })
export class FieldOptionChildren extends EntityCoreProps {
  static plural = 'fieldOptionChildren';

  @ManyToOne(type => FieldOption, fieldOption => fieldOption.id, {
    primary: true,
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ referencedColumnName: 'uid' })
  parentFieldOption: FieldOption;

  @ManyToOne(type => FieldOption, fieldOption => fieldOption.id, {
    primary: true,
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ referencedColumnName: 'uid' })
  childFieldOption: FieldOption;
}