import { Controller } from '@nestjs/common';
import { OrganisationUnitGroup } from '../entities/organisation-unit-group.entity';
import { OrganisationUnitGroupService } from '../services/organisation-unit-group.service';
import { MaintenanceBaseController } from 'src/core/maintenance/controllers/base.contoller';

@Controller('api/' + OrganisationUnitGroup.plural)
export class OrganisationUnitGroupController extends MaintenanceBaseController<
  OrganisationUnitGroup
> {
  constructor(organisationUnitGroupService: OrganisationUnitGroupService) {
    super(organisationUnitGroupService, OrganisationUnitGroup);
  }
}
