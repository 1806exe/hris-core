import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { Field } from './field.entity';
import { FormSection } from './form-section.entity';
import { HRISBaseEntity } from '../../../core/entities/base-entity';

@Entity('formsectionfieldmember', { schema: 'public' })
export class FormSectionFieldMember extends HRISBaseEntity {
  static plural = 'formSectionFieldMembers';

  @ManyToOne(
    type => FormSection,
    formSection => formSection.formSectionFieldMembers,
    { primary: true, nullable: false, onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: 'formsectionid' })
  formSection: FormSection | null;

  @ManyToOne(
    type => Field,
    field => field.formSectionFieldMembers,
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
