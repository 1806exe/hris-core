import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as _ from 'lodash';
import { UIDToIDTransformation } from '@icodebible/utils/resolvers/uid-to-id';

import { OrganisationUnit } from '../entities/organisation-unit.entity';
import { MaintenanceBaseService } from '../../../core/maintenance/services/base.service';
import { entityTableMapper } from '../../../core/resolvers/database-table.resolver';

@Injectable()
export class OrganisationUnitService extends MaintenanceBaseService<
  OrganisationUnit
> {
  constructor(
    @InjectRepository(OrganisationUnit)
    private organisationUnitRepository: Repository<OrganisationUnit>,
  ) {
    super(organisationUnitRepository, OrganisationUnit);
  }
}
