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
import { User } from '../../../modules/system/user/entities/user.entity';
import { TransactionTimestamp } from '../../../core/entities/transaction-timestamp.entity';
import { generateUid } from '../../../core/helpers/makeuid';

@Entity('recordvalue', { schema: 'public' })
export class RecordValue extends TransactionTimestamp {
  @PrimaryGeneratedColumn()
  recordvalueid: number;

  @ManyToOne(() => Record, (record: Record) => record.recordValues, {})
  @JoinColumn({ name: 'recordid', referencedColumnName: 'id' })
  record: Record | null;

  @Column('text', {
    nullable: false,
    name: 'value',
  })
  value: string;

  @Column('char', {
    nullable: false,
    length: 13,
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

  @Column('integer', {
    name: 'recordid',
  })
  recordid: number;

  @Column('integer', {
    name: 'fieldid',
  })
  fieldid: number;

  @Column('character varying', {
    nullable: true,
    length: 255,
    default: () => 'NULL::character varying',
    name: 'entitledpayment',
  })
  entitledPayment: string | null;

  @OneToOne(() => Field, (field) => field, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'fieldid', referencedColumnName: 'id' })
  field: Field | null;

  @JoinColumn({ name: 'createdbyid' })
  createdBy: User;

  @JoinColumn({ name: 'lastupdatedbyid' })
  lastUpdatedBy: User;

  @BeforeInsert()
  beforeUpdateTransaction() {
    this.uid = generateUid();
  }
}
