import { Injectable } from '@nestjs/common';
import { OrganisationUnitGroupSet } from '../entities/organisation-unit-group-set.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MaintenanceBaseService } from '../../../core/maintenance/services/base.service';

@Injectable()
export class OrganisationUnitGroupSetService extends MaintenanceBaseService<
  OrganisationUnitGroupSet
> {
  constructor(
    @InjectRepository(OrganisationUnitGroupSet)
    organisationUnitGroupSetRepository: Repository<OrganisationUnitGroupSet>,
  ) {
    super(organisationUnitGroupSetRepository, OrganisationUnitGroupSet);
  }
}
