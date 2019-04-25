import { Controller } from '@nestjs/common';
import { BaseController } from 'src/core/controllers/base.contoller';
import { OrganisationUnitGroupSet } from '../entities/organisation-unit-group-set.entity';
import { OrganisationUnitGroupSetService } from '../services/organisation-unit-group-set.service';

@Controller('organisationUnitGroupSets')
export class OrganisationUnitGroupSetController extends BaseController<
  OrganisationUnitGroupSet
> {
  constructor(
    organisationUnitGroupSetService: OrganisationUnitGroupSetService,
  ) {
    super(organisationUnitGroupSetService);
  }

  get plural() {
    return 'organisationUnitGroupSets';
  }
}
