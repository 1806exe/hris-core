import { Controller } from '@nestjs/common';
import { BaseController } from '../../../core/controllers/base.contoller';
import { OrganisationUnitLevel } from '../entities/organisation-unit-level.entity';
import { OrganisationUnitLevelService } from '../services/organisation-unit-level.service';

@Controller('organisationUnitLevels')
export class OrganisationUnitLevelController extends BaseController<
  OrganisationUnitLevel
> {
  constructor(organisationUnitLevelService: OrganisationUnitLevelService) {
    super(organisationUnitLevelService);
  }

  get plural() {
    return 'organisationUnitLevels';
  }
}
