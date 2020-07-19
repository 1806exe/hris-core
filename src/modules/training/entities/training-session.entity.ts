import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  BeforeInsert,
} from 'typeorm';
import { TransactionTimestamp } from '../../../core/entities/transaction-timestamp.entity';
import { OrganisationUnit } from '../../organisation-unit/entities/organisation-unit.entity';
import { TrainingCurriculum } from './training-curriculum.entity';
import { TrainingSponsor } from './training-sponsor.entity';
import { TrainingTopic } from './training-topic.entity';
import { TrainingVenue } from './training-venue.entity';
import { TrainingSessionAccess } from './training-session-access.entity';
import { Record } from '../../record/entities/record.entity';
import { generateUid } from 'src/core/helpers/makeuid';
@Entity('trainingsession', { schema: 'public' })
export class TrainingSession extends TransactionTimestamp {
  static plural = 'sessions';
  @Column('integer', {
    nullable: false,
    primary: true,
    name: 'id',
  })
  id: number;
  @Column('character varying', {
    nullable: false,
    length: 13,
    name: 'uid',
  })
  uid: string;

  @ManyToOne(
    () => OrganisationUnit,
    (OrganisationUnit: OrganisationUnit) => OrganisationUnit.trainingSessions,
    { eager: true, onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: 'organisationunit' })
  organisationUnit: OrganisationUnit | null;

  @ManyToOne(
    () => TrainingSponsor,
    (TrainingSponsor: TrainingSponsor) => TrainingSponsor.trainingSessions,
    { eager: true, onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: 'sponsor' })
  sponsor: TrainingSponsor | null;
  @Column('timestamp without time zone', {
    nullable: true,
    default: () => 'NULL::timestamp without time zone',
    name: 'startdate',
  })
  startDate: Date | null;
  @Column('timestamp without time zone', {
    nullable: true,
    default: () => 'NULL::timestamp without time zone',
    name: 'enddate',
  })
  endDate: Date | null;
  @Column('timestamp without time zone', {
    nullable: false,
    name: 'created',
  })
  created: Date;
  @ManyToOne(
    () => TrainingCurriculum,
    (TrainingCurriculum: TrainingCurriculum) =>
      TrainingCurriculum.trainingSessions,
    { eager: true, onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: 'curriculumid' })
  curriculum: TrainingCurriculum | null;
  @ManyToOne(
    () => TrainingSponsor,
    (TrainingSponsor: TrainingSponsor) => TrainingSponsor.trainingSessions,
    { eager: true, onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: 'organiser' })
  organiser: TrainingSponsor | null;
  @Column('character varying', {
    nullable: true,
    length: 100,
    default: () => 'NULL::character varying',
    name: 'createdby',
  })
  createdby: string | null;
  @Column('integer', {
    nullable: true,
    name: 'trainingid',
  })
  trainingid: number | null;
  @Column('character varying', {
    nullable: true,
    length: 20,
    name: 'deliverymode',
  })
  deliverymode: string | null;

  @ManyToMany(
    () => TrainingTopic,
    (TrainingMethod: TrainingTopic) => TrainingMethod.trainingSessions,
    { nullable: false, eager: true },
  )
  @JoinTable({ name: 'trainingsessiontopics' })
  topics: TrainingTopic[];

  @OneToOne(
    (type) => TrainingVenue,
    (trainingvenue) => trainingvenue.trainingSessions,
    { eager: true },
  )
  @JoinColumn({ name: 'venue' })
  venue: TrainingVenue;

  @ManyToMany(
    (type) => TrainingSessionAccess,
    (trainingsessionaccess) => trainingsessionaccess.session,
    {
      nullable: false,
      eager: true,
    },
  )
  @JoinTable({ name: 'sessionuseraccess' })
  trainingsessionaccess: TrainingSessionAccess[];

  // @ManyToMany((type) => Record, (record) => record.trainingSessions, {})
  // record: Record[];
  @BeforeInsert()
  beforeUpdateTransaction() {
    this.uid = generateUid();
  }
}
