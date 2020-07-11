/**
 *
 */
import { EntityCoreProps } from '../../../core/entities/entity-core-props';
import { OrganisationUnitCompleteness } from '../../organisation-unit/entities/organisation-unit-completeness.entity';
import { Column, Entity, OneToMany, JoinTable, ManyToMany } from 'typeorm';

/**
 *
 */
import { Record } from '../../record/entities/record.entity';
import { FormFieldMember } from './form-field-member.entity';
import { FormSection } from './form-section.entity';
import { FormVisibleField } from './form-visible-fields.entity';
import { Indicator } from '../../indicator/entities/indicator.entity';
import { RecordRule } from '../../record-rule/entities/record-rule/record-rule.entity';

/**
 *
 */
@Entity('form', { schema: 'public' })
/**
 *
 */
export class Form extends EntityCoreProps {
  /**
   *
   */
  static plural = 'forms';

  /**
   *
   */
  @Column('integer', {
    nullable: false,
    primary: true,
    name: 'formid',
  })
  id: number;

  /**
   *
   */
  @Column('text', {
    nullable: true,
    name: 'hypertext',
  })
  hyperText: string | null;

  /**
   *
   */
  @Column('varchar', {
    nullable: true,
    length: 64,
    default: () => 'NULL::character varying',
    name: 'title',
  })
  title: string | null;

  /**
   *
   */
  @OneToMany(
    (type) => FormFieldMember,
    (formFieldMember) => formFieldMember.form,
    {
      eager: false,
      cascade: true,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
  )
  formFieldMembers: FormFieldMember[];

  /**
   *
   */
  @OneToMany(
    (type) => FormVisibleField,
    (formVisibleField) => formVisibleField.form,
    { onDelete: 'CASCADE' },
  )
  formVisibleFields: FormVisibleField[];

  /**
   *
   */
  @OneToMany((type) => FormSection, (formSection) => formSection.form, {
    onDelete: 'CASCADE',
  })
  formSections: FormSection[];

  /**
   *
   */
  @OneToMany(
    (type) => OrganisationUnitCompleteness,
    (organisationUnitCompleteness) => organisationUnitCompleteness.form,
  )
  organisationUnitCompletenesss: OrganisationUnitCompleteness[];

  /**
   *
   */
  @OneToMany((type) => Record, (record) => record.form, {
    onDelete: 'CASCADE',
  })
  records: Record[];

  // @ManyToMany(
  //   type => Field,
  //   field => field.forms,
  //   {
  //     nullable: false,
  //   },
  // )
  // @JoinTable({ name: 'formuniquerecordfields' })
  // fields: Field[];

  // @ManyToMany(
  //   type => User,
  //   user => user.forms,
  // )
  // users: User[];

  /**
   *
   */
  @OneToMany(() => Indicator, (indicator: Indicator) => indicator.form)
  indicators: Indicator[];

  @OneToMany((type) => RecordRule, (recordRule) => recordRule.form, {
    eager: true,
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  recordRules: RecordRule[];
}
