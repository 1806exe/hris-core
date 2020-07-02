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
} from 'typeorm';
import { TransactionUser } from '../../../core/entities/transaction-user.entity';
import { OrganisationUnit } from '../../organisation-unit/entities/organisation-unit.entity';
import { TrainingSession } from '../../training/entities/training-session.entity';
import { Form } from '../../form/entities/form.entity';
import { RecordValue } from './record-value.entity';
import { SessionParticipant } from '../../training/entities/training-session-participant.entity';
import { SessionFacilitator } from '../../training/entities/training-session-facilitatory.entity';
import { User } from '../../system/user/entities/user.entity';

@Entity('record', { schema: 'public' })
export class Record extends TransactionUser {
  static plural = 'records';

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 256, unique: true })
  uid: string;

  @ManyToOne(
    (type) => OrganisationUnit,
    (organisationUnit) => organisationUnit.records,
    { nullable: false, onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: 'organisationunitid' })
  organisationUnit: OrganisationUnit | null;

  @ManyToOne((type) => Form, (form) => form.records, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'formid' })
  form: Form | null;

  @Column('character varying', {
    nullable: false,
    length: 64,
    name: 'instance',
  })
  instance: string;

  @Column('boolean', { nullable: false, name: 'certified' })
  certified: boolean;

  @Column('date', { nullable: false, name: 'certificationdate' })
  certificationdate: Date;

  @Column('boolean', { nullable: false, name: 'assessed' })
  assessed: boolean;

  @Column('date', { nullable: false, name: 'assessmentdate' })
  assessmentdate: Date;

  @OneToOne((type) => User, (user) => user.assesser, { eager: true })
  @JoinColumn({ name: 'assessedby' })
  assesser: User[];

  @OneToOne((type) => User, (user) => user.certifier, { eager: true })
  @JoinColumn({ name: 'certifiedby' })
  certifier: User[];

  @OneToMany(
    () => RecordValue,
    (recordvalue: RecordValue) => recordvalue.record,
    { onDelete: 'CASCADE' },
  )
  recordValues: RecordValue[];

  @ManyToMany(
    (type) => TrainingSession,
    (trainingSession) => trainingSession.topics,
  )
  trainingSessions: TrainingSession[];

  @OneToMany(
    (type) => SessionParticipant,
    (participants) => participants.recordId,
  )
  @JoinColumn({ name: 'recordId' })
  participants: SessionParticipant[];

  @OneToMany(
    (type) => SessionFacilitator,
    (sessionfacilitator) => sessionfacilitator.recordId,
  )
  @JoinColumn({ name: 'recordId' })
  facilitators: SessionFacilitator[];

  @ManyToMany((type) => TrainingSession, (sessions) => sessions.record, {
    eager: true,
  })
  @JoinTable({ name: 'sessionparticipant' })
  sessions: TrainingSession[];
}
