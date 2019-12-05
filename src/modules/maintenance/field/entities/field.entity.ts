import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';

import { FieldDataType } from '../../field-data-type/entities/field-datatype.entity';
import { FieldGroup } from '../../field-group/entities/field-group.entity';
import { FieldInputType } from '../../field-input-type/entities/field-input-type.entity';
import { FieldOptionGroup } from '../../field-option-group/entities/field-option-group.entity';
import { FieldOptionMerge } from '../../field-option-merge/entities/field-option-merge.entity';
import { FieldOption } from '../../field-option/entities/field-option.entity';
import { FieldRelation } from '../../field-relation/entities/field-relation.entity';
import { FormFieldMember } from '../../../form/entities/form-field-member.entity';
import { FormVisibleField } from '../../../form/entities/form-visible-fields.entity';
import { Form } from '../../../form/entities/form.entity';
import { FormSectionFieldMember } from '../../../form/entities/formsection-fieldmembers.entity';
import { EntityCoreProps } from '../../../../core/entities/entity-core-props';
import { RecordValue } from '../../../../modules/record/entities/record-value.entity';

@Entity('field', { schema: 'public' })
export class Field extends EntityCoreProps {
  static plural = 'fields';

  @Column({ type: 'varchar', length: 64 })
  caption: string;

  @Column({ type: 'boolean', nullable: true })
  compulsory: boolean | null;

  @Column({ type: 'boolean', nullable: true })
  isUnique: boolean | null;

  @Column({ type: 'boolean', nullable: true })
  isCalculated: boolean | null;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ type: 'text', nullable: true })
  calculatedExpression: string | null;

  @Column({ type: 'boolean', nullable: true })
  hasHistory: boolean | null;

  @Column({ type: 'boolean', nullable: false, default: false })
  hasOptions: boolean | null;

  @Column({ type: 'boolean', nullable: true })
  hasTarget: boolean | null;

  @Column({ type: 'boolean', nullable: true, name: 'fieldrelation' })
  fieldRelation: boolean | null;

  @Column({ type: 'boolean', nullable: true, name: 'skipinreport' })
  skipInReport: boolean | null;

  /**
   * Many To Many Relationship: Field and FieldGroup
   */
  @ManyToMany(type => FieldGroup, fieldGroup => fieldGroup.fields, {
    eager: true,
    cascade: true,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  fieldGroups: FieldGroup[];

  /**
   * Many To One Relationship: Field and FieldGroup
   */
  @ManyToOne(type => FieldDataType, fieldDataType => fieldDataType.fields, {
    cascade: true,
    eager: true,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ referencedColumnName: 'id' })
  dataType: FieldDataType;

  @OneToMany(type => FieldRelation, fieldRelation => fieldRelation.childField, {
    onDelete: 'CASCADE',
  })
  childFieldRelations: FieldRelation[];

  @OneToMany(
    type => FieldRelation,
    fieldRelation => fieldRelation.parentField,
    { onDelete: 'CASCADE' },
  )
  parentFieldRelations: FieldRelation[];

  /**
   * One To Many Relationship: Field and FieldOption
   */
  @OneToMany(type => FieldOption, fieldOption => fieldOption.field, {
    cascade: true,
    eager: true,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  fieldOptions: FieldOption[];

  /**
   * Many To One Relationship: Field and FieldInputType
   */

  @ManyToOne(type => FieldInputType, fieldInputType => fieldInputType.fields, {
    cascade: true,
    eager: true,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ referencedColumnName: 'id' })
  fieldInputType: FieldInputType;

  @OneToMany(
    type => FieldOptionGroup,
    fieldOptionGroup => fieldOptionGroup.field,
    { onDelete: 'CASCADE' },
  )
  fieldOptionGroups: FieldOptionGroup[];

  @OneToMany(
    type => FieldOptionMerge,
    fieldOptionMerge => fieldOptionMerge.field,
    { onDelete: 'CASCADE' },
  )
  fieldOptionMerges: FieldOptionMerge[];

  @OneToMany(
    type => FormFieldMember,
    formFieldMember => formFieldMember.field,
    { onDelete: 'CASCADE' },
  )
  formFieldMembers: FormFieldMember[];

  @OneToMany(
    type => FormVisibleField,
    formVisibleField => formVisibleField.field,
    { onDelete: 'CASCADE' },
  )
  formVisibleFields: FormVisibleField[];

  @OneToMany(
    type => FormSectionFieldMember,
    formSectionFieldMember => formSectionFieldMember.field,
    { onDelete: 'CASCADE' },
  )
  formSectionFieldMembers: FormSectionFieldMember[];

  @ManyToMany(type => Form, form => form.fields)
  forms: Form[];

  @ManyToOne(
    type => RecordValue,
    recordValue => recordValue.field,
    { eager: true, nullable: false, onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: 'recordvalueid' })
  recordValue: RecordValue | null;
}
