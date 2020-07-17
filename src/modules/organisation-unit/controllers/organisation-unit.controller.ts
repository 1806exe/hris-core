import { Controller, Get, UseGuards, Query } from '@nestjs/common';

import { OrganisationUnitService } from '../services/organisation-unit.service';
import { OrganisationUnit } from '../entities/organisation-unit.entity';
import { MaintenanceBaseController } from '../../../core/maintenance/controllers/base.controller';
import { SessionGuard } from '../../../modules/system/user/guards/session.guard';
import { ApiResult, Pager } from '../../../core/interfaces';
import { sanitizeResponseObject } from '../../../core/utilities/sanitize-response-object';
import { getPagerDetails } from '../../../core/utilities';
import * as _ from 'lodash';

@Controller('api/' + OrganisationUnit.plural)
export class OrganisationUnitsController extends MaintenanceBaseController<
  OrganisationUnit
> {
  constructor(private organisationUnitService: OrganisationUnitService) {
    super(organisationUnitService, OrganisationUnit);
  }
}
