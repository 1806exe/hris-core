import { Column, Entity, Index, OneToMany } from 'typeorm';
import { OrganisationUnitGroup } from './organisation-unit-group.entity';
import { EntityCoreProps } from '../../../core/entities/entity-core-props';

@Entity('organisationunitgroupset', { schema: 'public' })
export class OrganisationUnitGroupSet extends EntityCoreProps {
  static plural = 'organisationUnitGroupSets';

  @Column('character varying', {
    nullable: true,
    length: 11,
    default: () => 'NULL::character varying',
    name: 'dhisuid',
  })
  dhisuid: string | null;

  @Column('boolean', {
    nullable: false,
    name: 'compulsory',
  })
  compulsory: boolean;

  @OneToMany(
    (type) => OrganisationUnitGroup,
    (organisationUnitGroup) => organisationUnitGroup.organisationUnitGroupSetId,
    { onDelete: 'CASCADE' },
  )
  organisationUnitGroups: OrganisationUnitGroup[];
}
