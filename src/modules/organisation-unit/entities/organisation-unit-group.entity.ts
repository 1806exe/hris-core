import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
} from 'typeorm';

import { OrganisationUnitGroupSet } from './organisation-unit-group-set.entity';
import { OrganisationUnit } from './organisation-unit.entity';
import { EntityCoreProps } from '../../../core/entities/entity-core-props';

@Entity('organisationunitgroup', { schema: 'public' })
export class OrganisationUnitGroup extends EntityCoreProps {
  static plural = 'organisationUnitGroups';

  @ManyToOne(
    (type) => OrganisationUnitGroupSet,
    (organisationUnitGroupSet) =>
      organisationUnitGroupSet.organisationUnitGroups,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: 'organisationunitgroupsetid' })
  organisationUnitGroupSetId: string;

  @Column('character varying', {
    nullable: true,
    length: 11,
    default: () => 'NULL::character varying',
    name: 'dhisuid',
  })
  dhisuid: string | null;

  //   @OneToMany(
  //     type => hris_indicator_target,
  //     hris_indicator_target => hris_indicator_target.organisationunitgroup_,
  //     { onDelete: 'CASCADE' },
  //   )
  //   hris_indicator_targets: hris_indicator_target[];

  @ManyToMany(
    (type) => OrganisationUnit,
    (organisationUnit) => organisationUnit.organisationUnitGroups,
    { nullable: false },
  )
  @JoinTable({ name: 'organisationunitgroupmembers' })
  organisationUnits: OrganisationUnit[];
}
