import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrganisationUnitGroup } from '../entities/organisation-unit-group.entity';
import { Repository } from 'typeorm';
import { MaintenanceBaseService } from 'src/core/maintenance/services/base.service';

@Injectable()
export class OrganisationUnitGroupService extends MaintenanceBaseService<
  OrganisationUnitGroup
> {
  constructor(
    @InjectRepository(OrganisationUnitGroup)
    organisationUnitGroupRepository: Repository<OrganisationUnitGroup>,
  ) {
    super(organisationUnitGroupRepository, OrganisationUnitGroup);
  }
}
