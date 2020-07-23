import { EntityCoreProps } from '../../../core/entities/entity-core-props';
import { OrganisationUnit } from '../../organisation-unit/entities/organisation-unit.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  BeforeInsert,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TrainingSession } from './training-session.entity';
import { generateUid } from '../../../core/helpers/makeuid';
import { TransactionTimestamp } from '../../../core/entities/transaction-timestamp.entity';

@Entity('trainingvenue', { schema: 'public' })
export class TrainingVenue extends TransactionTimestamp {
  static plural = 'venues';
  @PrimaryGeneratedColumn({
    name: 'id',
  })
  id: number;
  @Column('character varying', {
    nullable: false,
    length: 255,
    name: 'name',
  })
  name: string;
  @Column('char', {
    nullable: false,
    length: 13,
    name: 'uid',
  })
  uid: string;

  @Column('character varying', {
    nullable: false,
    length: 255,
    name: 'region',
  })
  region: string;
  @Column('character varying', {
    nullable: false,
    length: 255,
    name: 'district',
  })
  district: string;
  @ManyToOne(
    (type) => OrganisationUnit,
    (organisationUnit) => organisationUnit.trainingVenues,
    { onDelete: 'CASCADE', eager: true },
  )
  @JoinColumn({ name: 'organisationunit' })
  organisationUnit: OrganisationUnit | null;

  @OneToMany(
    (type) => TrainingSession,
    (trainingSession) => trainingSession.venue,
    { onDelete: 'CASCADE' },
  )
  trainingSessions: TrainingSession[];

  @BeforeInsert()
  beforeUpdateTransaction() {
    this.uid = generateUid();
  }
}
