import { IdentifiableObject } from 'src/core/entities/identifiable-object';
import { Column, Entity, OneToMany } from 'typeorm';

import { Field } from './field.entity';

@Entity('fieldinputtype', { schema: 'public' })
export class FieldInputType extends IdentifiableObject {
  @Column('integer', {
    nullable: false,
    primary: true,
    name: 'fieldinputtypeid',
  })
  id: number;

  @Column('character varying', {
    nullable: true,
    length: 255,
    default: () => 'NULL::character varying',
    name: 'htmltag',
  })
  htmltag: string | null;

  @OneToMany(type => Field, field => field.inputType, { onDelete: 'CASCADE' })
  fields: Field[];
}
