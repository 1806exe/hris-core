import { Controller } from '@nestjs/common';
import { OrganisationUnitCompleteness } from '../entities/organisation-unit-completeness.entity';
import { OrganisationUnitCompletenessService } from '../services/organisation-unit-completeness.service';
import { MaintenanceBaseController } from 'src/core/maintenance/controllers/base.contoller';

@Controller('api/' + OrganisationUnitCompleteness.plural)
export class OrganisationUnitCompletenessController extends MaintenanceBaseController<
  OrganisationUnitCompleteness
> {
  constructor(
    organisationUnitCompletenessService: OrganisationUnitCompletenessService,
  ) {
    super(organisationUnitCompletenessService, OrganisationUnitCompleteness);
  }
}
