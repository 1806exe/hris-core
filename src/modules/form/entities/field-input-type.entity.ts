import { Column, Entity, OneToMany, PrimaryColumn, Generated } from 'typeorm';

import { Field } from './field.entity';
import { EntityCoreProps } from '../../../core/entities/entity-core-props';

@Entity('fieldinputtype', { schema: 'public' })
export class FieldInputType extends EntityCoreProps {
  static plural = 'fieldInputTypes';

  @PrimaryColumn({ select: false })
  @Generated('increment')
  id: number;

  @Column({
    type: 'varchar',
    nullable: true,
    length: 255,
    default: () => 'NULL::character varying',
  })
  htmlTag: string;
}
