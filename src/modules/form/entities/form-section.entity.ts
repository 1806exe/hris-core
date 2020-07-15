import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { Form } from './form.entity';
import { FormSectionFieldMember } from './formsection-fieldmembers.entity';
import { EntityCoreProps } from '../../../core/entities/entity-core-props';

@Entity('formsection', { schema: 'public' })
export class FormSection extends EntityCoreProps {

  static plural = 'formSections';

  @Column('integer', {
    nullable: false,
    primary: true,
    name: 'id',
  })
  id: number;

  @ManyToOne(type => Form, form => form.formSections, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'formid' })
  form: Form | null;

  @OneToMany(
    type => FormSectionFieldMember,
    formSectionFieldMembers => formSectionFieldMembers.formSection,
    { onDelete: 'CASCADE' },
  )
  formSectionFieldMembers: FormSectionFieldMember[];
}
