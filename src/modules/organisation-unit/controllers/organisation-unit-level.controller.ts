import { Controller } from '@nestjs/common';
import { OrganisationUnitLevel } from '../entities/organisation-unit-level.entity';
import { OrganisationUnitLevelService } from '../services/organisation-unit-level.service';
import { MaintenanceBaseController } from '../../../core/maintenance/controllers/base.controller';

@Controller('api/' + OrganisationUnitLevel.plural)
export class OrganisationUnitLevelController extends MaintenanceBaseController<
  OrganisationUnitLevel
> {
  constructor(organisationUnitLevelService: OrganisationUnitLevelService) {
    super(organisationUnitLevelService, OrganisationUnitLevel);
  }
}
