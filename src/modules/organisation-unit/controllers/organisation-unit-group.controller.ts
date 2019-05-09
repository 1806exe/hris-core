import { Controller } from '@nestjs/common';
import { BaseController } from '../../../core/controllers/base.contoller';
import { OrganisationUnitGroup } from '../entities/organisation-unit-group.entity';
import { OrganisationUnitGroupService } from '../services/organisation-unit-group.service';

@Controller('organisationUnitGroups')
export class OrganisationUnitGroupController extends BaseController<
  OrganisationUnitGroup
> {
  constructor(organisationUnitGroupService: OrganisationUnitGroupService) {
    super(organisationUnitGroupService);
  }

  get plural() {
    return 'organisationUnitGroups';
  }
}
