import { Injectable } from '@nestjs/common';
import { OrganisationUnitCompleteness } from '../entities/organisation-unit-completeness.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MaintenanceBaseService } from 'src/core/maintenance/services/base.service';

@Injectable()
export class OrganisationUnitCompletenessService extends MaintenanceBaseService<
  OrganisationUnitCompleteness
> {
  constructor(
    @InjectRepository(OrganisationUnitCompleteness)
    organisationUnitCompletenessRepository: Repository<
      OrganisationUnitCompleteness
    >,
  ) {
    super(organisationUnitCompletenessRepository, OrganisationUnitCompleteness);
  }
}
