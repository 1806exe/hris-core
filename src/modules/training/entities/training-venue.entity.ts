import { EntityCoreProps } from '../../../core/entities/entity-core-props';
import { OrganisationUnit } from '../../organisation-unit/entities/organisation-unit.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { TrainingSession } from './training-session.entity';
@Entity('trainingvenue', { schema: 'public' })
export class TrainingVenue extends EntityCoreProps {
  static plural = 'venues';
  @Column('integer', {
    nullable: false,
    primary: true,
    name: 'id',
  })
  id: number;
  @Column('character varying', {
    nullable: false,
    length: 255,
    name: 'name',
  })
  name: string;
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
}
