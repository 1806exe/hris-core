import { Entity, JoinColumn, ManyToOne } from 'typeorm';

import { FieldOption } from './field-option.entity';
import { EntityCoreProps } from '../../../core/entities/entity-core-props';

@Entity('fieldoptionchildren', { schema: 'public' })
export class FieldOptionChildren extends EntityCoreProps {
  static plural = 'fieldOptionChildren';

  @ManyToOne((type) => FieldOption, (fieldOption) => fieldOption.id, {
    primary: true,
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ referencedColumnName: 'id' })
  parentFieldOption: FieldOption;

  @ManyToOne((type) => FieldOption, (fieldOption) => fieldOption.id, {
    primary: true,
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ referencedColumnName: 'id' })
  childFieldOption: FieldOption;
}
