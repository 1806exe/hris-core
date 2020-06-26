import { Injectable } from '@nestjs/common';
import { OrganisationUnitLevel } from '../entities/organisation-unit-level.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MaintenanceBaseService } from '../../../core/maintenance/services/base.service';

@Injectable()
export class OrganisationUnitLevelService extends MaintenanceBaseService<
  OrganisationUnitLevel
> {
  constructor(
    @InjectRepository(OrganisationUnitLevel)
    organisationUnitLevelRepository: Repository<OrganisationUnitLevel>,
  ) {
    super(organisationUnitLevelRepository, OrganisationUnitLevel);
  }
}
