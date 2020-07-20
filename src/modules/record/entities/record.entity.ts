import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinTable,
  BeforeInsert,
} from 'typeorm';
import { OrganisationUnit } from '../../organisation-unit/entities/organisation-unit.entity';
import { TrainingSession } from '../../training/entities/training-session.entity';
import { Form } from '../../form/entities/form.entity';
import { RecordValue } from './record-value.entity';
import { SessionParticipant } from '../../training/entities/training-session-participant.entity';
import { SessionFacilitator } from '../../training/entities/training-session-facilitatory.entity';
import { User } from '../../system/user/entities/user.entity';
import { TransactionTimestamp } from '../../../core/entities/transaction-timestamp.entity';
import { generateUid } from '../../../core/helpers/makeuid';

@Entity('record', { schema: 'public' })
export class Record extends TransactionTimestamp {
  static plural = 'records';

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'char', length: 13, unique: true })
  uid: string;

  @ManyToOne(
    (type) => OrganisationUnit,
    (organisationUnit) => organisationUnit.records,
    { nullable: false, onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: 'organisationunitid', referencedColumnName: 'id' })
  organisationUnit: OrganisationUnit | null;

  @ManyToOne((type) => Form, (form) => form.records, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'formid', referencedColumnName: 'id' })
  form: Form | null;

  @Column('character varying', {
    nullable: false,
    length: 64,
    name: 'instance',
  })
  instance: string;

  @OneToMany(
    () => RecordValue,
    (recordvalue: RecordValue) => recordvalue.record,
    { onDelete: 'CASCADE' },
  )
  recordValues: RecordValue[];

  // @ManyToMany(
  //   (type) => TrainingSession,
  //   (trainingSession) => trainingSession.record,
  // )
  // @JoinTable({ name: 'sessionparticipant' })
  // trainingSessions: TrainingSession[];

  @OneToMany(
    (type) => SessionParticipant,
    (participants) => participants.recordId,
  )
  @JoinColumn({ name: 'recordId' })
  participants: SessionParticipant[];

  @OneToMany(
    (type) => SessionFacilitator,
    (facilitators) => facilitators.recordId,
  )
  @JoinColumn({ name: 'recordId' })
  facilitators: SessionFacilitator[];

  @JoinColumn({ name: 'createdbyid' })
  createdBy: User;

  @JoinColumn({ name: 'lastupdatedbyid' })
  lastUpdatedBy: User;

  @BeforeInsert()
  beforeUpdateTransaction() {
    this.uid = generateUid();
  }
}
