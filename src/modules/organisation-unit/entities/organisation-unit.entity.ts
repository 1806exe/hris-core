import { IdentifiableObject } from 'src/core/entities/identifiable-object';
import { TrainingSession } from 'src/modules/training/entities/training-session.entity';
import { TrainingVenue } from 'src/modules/training/entities/training-venue.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { Field, ObjectType } from 'type-graphql';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';

import { OrganisationUnitCompleteness } from './organisation-unit-completeness.entity';
import { OrganisationUnitGroup } from './organisation-unit-group.entity';
import { DashboardChart } from 'src/modules/dashboard/entities/dashboard-chart.entity';
import { Record } from 'src/modules/record/entities/record.entity';

@Entity('organisationunit', { schema: 'public' })
@ObjectType()
export class OrganisationUnit extends IdentifiableObject {

  static plural = 'organisationUnits';
  
  @Field()
  @ManyToOne(
    type => OrganisationUnit,
    organisationUnit => organisationUnit.organisationUnits,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: 'parentid' })
  parent: OrganisationUnit | null;

  @Field()
  @Column('character varying', {
    nullable: true,
    length: 11,
    default: () => 'NULL::character varying',
    name: 'dhisuid',
  })
  dhisuid: string | null;

  @Field()
  @Column('boolean', {
    nullable: true,
    name: 'active',
  })
  active: boolean | null;

  @Field()
  @Column('date', {
    nullable: true,
    name: 'openingdate',
  })
  openingDate: string | null;

  @Field()
  @Column('date', {
    nullable: true,
    name: 'closingdate',
  })
  closingDate: string | null;

  @Field()
  @Column('character varying', {
    nullable: true,
    length: 255,
    default: () => 'NULL::character varying',
    name: 'geocode',
  })
  geoCode: string | null;

  @Field()
  @Column('text', {
    nullable: true,
    name: 'coordinates',
  })
  coordinates: string | null;

  @Field()
  @Column('character varying', {
    nullable: true,
    length: 20,
    default: () => 'NULL::character varying',
    name: 'featuretype',
  })
  featureType: string | null;

  @Field()
  @Column('text', {
    nullable: true,
    name: 'address',
  })
  address: string | null;

  @Field()
  @Column('character varying', {
    nullable: true,
    length: 150,
    default: () => 'NULL::character varying',
    name: 'email',
  })
  email: string | null;

  @Field()
  @Column('character varying', {
    nullable: true,
    length: 150,
    default: () => 'NULL::character varying',
    name: 'phonenumber',
  })
  phoneNumber: string | null;

  @Field()
  @Column('character varying', {
    nullable: true,
    length: 150,
    default: () => 'NULL::character varying',
    name: 'contactperson',
  })
  contactPerson: string | null;

  @OneToMany(
    type => OrganisationUnit,
    organisationUnit => organisationUnit.parent,
    {
      cascade: ['insert', 'update'],
    },
  )
  children: OrganisationUnit[];

  // @OneToMany(
  //   type => hris_intergration_tiis_data_connection,
  //   hris_intergration_tiis_data_connection =>
  //     hris_intergration_tiis_data_connection.organisationunit_,
  //   { onDelete: 'CASCADE' },
  // )
  // hris_intergration_tiis_data_connections: hris_intergration_tiis_data_connection[];

  @OneToMany(
    type => OrganisationUnit,
    organisationUnit => organisationUnit.parent,
    { onDelete: 'CASCADE' },
  )
  organisationUnits: OrganisationUnit[];

  @OneToMany(
    type => OrganisationUnitCompleteness,
    organisationUnitCompleteness =>
      organisationUnitCompleteness.organisationUnitId,
    { onDelete: 'CASCADE' },
  )
  organisationUnitCompletenesses: OrganisationUnitCompleteness[];

  @OneToMany(type => Record, record => record.organisationUnit, {
    onDelete: 'CASCADE',
  })
  records: Record[];

  @OneToMany(
    type => TrainingSession,
    trainingSession => trainingSession.organisationUnit,
    { onDelete: 'CASCADE' },
  )
  trainingSessions: TrainingSession[];

  @OneToMany(
    type => TrainingVenue,
    trainingVenue => trainingVenue.organisationUnit,
    { onDelete: 'CASCADE' },
  )
  trainingVenues: TrainingVenue[];

  @OneToMany(type => User, user => user.organisationUnits, {
    onDelete: 'CASCADE',
  })
  users: User[];

  @ManyToMany(
    type => OrganisationUnitGroup,
    organisationUnitGroup => organisationUnitGroup.organisationUnits,
  )
  organisationUnitGroups: OrganisationUnitGroup[];

  @ManyToMany(
    type => DashboardChart,
    dashboardChart => dashboardChart.organisationUnits,
  )
  dashboardCharts: DashboardChart[];
}