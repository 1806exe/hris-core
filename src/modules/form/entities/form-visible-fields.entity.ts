import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { Field } from './field.entity';
import { Form } from './form.entity';
import { HRISBaseEntity } from '../../../core/entities/base-entity';

@Entity('formvisiblefield', { schema: 'public' })
export class FormVisibleField extends HRISBaseEntity {
  static plural = 'formVisibleFields';

  @ManyToOne(
    type => Form,
    form => form.formVisibleFields,
    {
      primary: true,
      nullable: false,
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'formid' })
  form: Form | null;

  @ManyToOne(
    type => Field,
    field => field.formVisibleFields,
    {
      primary: true,
      nullable: false,
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'fieldid' })
  field: Field | null;

  @Column('integer', {
    nullable: false,
    name: 'sort',
  })
  sort: number;
}
