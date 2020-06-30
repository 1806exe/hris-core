import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  OneToOne,
  Generated,
  BeforeInsert,
} from 'typeorm';

import { Record } from './record.entity';
import { Field } from '../../form/entities/field.entity';
import { TransactionUser } from '@hris/core/entities/transaction-user.entity';

@Entity('recordvalue', { schema: 'public' })
export class RecordValue extends TransactionUser {
  @PrimaryGeneratedColumn()
  recordvalueid: number;

  @ManyToOne(
    () => Record,
    (record: Record) => record.recordValues,
    {},
  )
  @JoinColumn({ name: 'recordid' })
  record: Record | null;

  @Column()
  recordid: number;

  @Column('text', {
    nullable: false,
    name: 'value',
  })
  value: string;

  @Generated('uuid')
  @Column('character varying', {
    nullable: false,
  })
  uid: string;

  @Column('timestamp without time zone', {
    nullable: true,
    default: () => 'NULL::timestamp without time zone',
    name: 'startdate',
  })
  startDate: Date;

  @Column('timestamp without time zone', {
    nullable: true,
    default: () => 'NULL::timestamp without time zone',
    name: 'enddate',
  })
  endDate: Date | null;

  @Column('character varying', {
    nullable: true,
    length: 255,
    default: () => 'NULL::character varying',
    name: 'comment',
  })
  comment: string | null;

  @Column('character varying', {
    nullable: true,
    length: 255,
    default: () => 'NULL::character varying',
    name: 'entitledpayment',
  })
  entitledPayment: string | null;

  @OneToOne(
    () => Field,
    field => field.recordValue,
    { nullable: false, onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: 'fieldid' })
  field: Field | null;

  @Column()
  fieldid: number;
}
