import { Column, Entity } from 'typeorm';
import { EntityCoreProps } from '../../../core/entities/entity-core-props';

@Entity('organisationunitlevel', { schema: 'public' })
export class OrganisationUnitLevel extends EntityCoreProps {

  static plural = 'organisationUnitLevels';

  @Column('integer', {
    nullable: false,
    name: 'level',
  })
  level: number;

  @Column('boolean', {
    nullable: false,
    name: 'dataentrylevel',
  })
  dataEntryLevel: boolean;
}
