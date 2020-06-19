/**
 *
 */
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
/**
 *
 */
import { Field } from './field.entity';
import { Form } from './form.entity';
import { EntityMembersCoreProps } from 'src/core/entities/entity-members-core-props';
/**
 *
 */
@Entity('formfieldmember', { schema: 'public' })
/**
 *
 */
export class FormFieldMember extends EntityMembersCoreProps {
  /**
   *
   */
  static plural = 'formFieldMembers';

  /**
   *
   */
  @Column()
  fieldid: string;

  /**
   *
   */
  @Column()
  formid: string;

  /**
   *
   */
  @Column({
    type: 'integer',
    name: 'sort',
    nullable: false,
  })
  sort: number;

  /**
   *
   */
  @Column({
    type: 'boolean',
    name: 'ispinned',
    nullable: true,
  })
  isPinned: boolean;

  /**
   *
   */
  @Column({
    type: 'boolean',
    name: 'showinlist',
    nullable: true,
  })
  showInList: boolean;

  /**
   *
   */
  @Column({
    type: 'boolean',
    name: 'showinprofile',
    nullable: true,
  })
  showInProfile: boolean;

  /**
   *
   */
  @Column({
    type: 'boolean',
    name: 'compulsory',
    nullable: true,
  })
  compulsory: boolean;

  /**
   *
   */
  @ManyToOne((type) => Form)
  @JoinColumn({ name: 'formid' })
  form: Form | null;

  /**
   *
   */
  @ManyToOne((type) => Field, {
    eager: true,
  })
  @JoinColumn({ name: 'fieldid' })
  field: Field;
}
