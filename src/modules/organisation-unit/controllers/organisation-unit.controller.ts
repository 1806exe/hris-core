import { Controller } from '@nestjs/common';

import { OrganisationUnitService } from '../services/organisation-unit.service';
import { OrganisationUnit } from '../entities/organisation-unit.entity';
import { MaintenanceBaseController } from '../../../core/maintenance/controllers/base.contoller';

@Controller('api/' + OrganisationUnit.plural)
export class OrganisationUnitsController extends MaintenanceBaseController<
  OrganisationUnit
> {
  constructor(organisationUnitService: OrganisationUnitService) {
    super(organisationUnitService, OrganisationUnit);
  }
}
