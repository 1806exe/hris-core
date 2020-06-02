import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { OrganisationUnit } from '../entities/organisation-unit.entity';
import { MaintenanceBaseService } from 'src/core/maintenance/services/base.service';

@Injectable()
export class OrganisationUnitService extends MaintenanceBaseService<
  OrganisationUnit
> {
  constructor(
    @InjectRepository(OrganisationUnit)
    organisationUnitRepository: Repository<OrganisationUnit>,
  ) {
    super(organisationUnitRepository, OrganisationUnit);
  }
}
