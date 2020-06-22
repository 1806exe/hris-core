import { Controller } from '@nestjs/common';
import { OrganisationUnitGroupSet } from '../entities/organisation-unit-group-set.entity';
import { OrganisationUnitGroupSetService } from '../services/organisation-unit-group-set.service';
import { MaintenanceBaseController } from 'src/core/maintenance/controllers/base.controller';

@Controller('api/' + OrganisationUnitGroupSet.plural)
export class OrganisationUnitGroupSetController extends MaintenanceBaseController<
  OrganisationUnitGroupSet
> {
  constructor(
    organisationUnitGroupSetService: OrganisationUnitGroupSetService,
  ) {
    super(organisationUnitGroupSetService, OrganisationUnitGroupSet);
  }
}
