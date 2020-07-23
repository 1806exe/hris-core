import { TransactionTimestamp } from '../../../../core/entities/transaction-timestamp.entity';
import {
  BeforeInsert,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Entity,
  JoinColumn,
} from 'typeorm';
import { generateUid } from '../../../../core/helpers/makeuid';
import { RecordRule } from '../record-rule/record-rule.entity';

@Entity('recordruleaction', { schema: 'public' })
export class RecordRuleAction extends TransactionTimestamp {
  static plural = 'recordRuleActions';

  @PrimaryGeneratedColumn()
  id: number;

  @Column('char', {
    nullable: true,
    length: 13,
    name: 'uid',
  })
  uid: string;

  @Column({ type: 'varchar', nullable: false, length: 256 })
  name: string;

  @Column({
    type: 'text',
    nullable: true,
    name: 'description',
  })
  description: string | null;

  @Column({ type: 'varchar', name: 'actiontype', nullable: false, length: 256 })
  actionType: string;

  @Column({ type: 'varchar', name: 'field', nullable: false, length: 256 })
  field: string;

  @Column({ type: 'text', name: 'message', nullable: true })
  message: string;

  @Column({ type: 'varchar', name: 'expression', nullable: true, length: 256 })
  expression: string;

  // TODO Find best way to associated last updated field with user entity
  @Column({ nullable: true, name: 'lastupdatedby' })
  lastUpdatedBy: string | null;

  @Column({
    type: 'char',
    nullable: true,
    length: 8,
    name: 'publicaccess',
  })
  publicAccess: string | null;

  @ManyToOne(
    (type) => RecordRule,
    (recordRule) => recordRule.recordRuleActions,
    {
      eager: false,
    },
  )
  @JoinColumn({ name: 'recordruleid' })
  recordRule: RecordRule;

  @Column({
    type: 'boolean',
    nullable: true,
    name: 'externalaccess',
  })
  externalAccess: boolean | null;
  @BeforeInsert()
  beforeInsertEntityCoreProps() {
    /**
     *  You can generate UUID in different ways
     *  1. You can generate uuid of any length: i.e getUid('', 20)
     *      Example of UUID::: 8aydSxYBrrP
     *  2. You can generat UUID by prepending a context specific keyword i.e getUid('HRIS', 20)
     *      Example of UUID::: HRIS_8aydSxYBrrP
     */
    this.uid = this.uid || generateUid();
  }
}
