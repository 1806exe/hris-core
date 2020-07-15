import { Controller, Get, UseGuards, Query } from '@nestjs/common';

import { OrganisationUnitService } from '../services/organisation-unit.service';
import { OrganisationUnit } from '../entities/organisation-unit.entity';
import { MaintenanceBaseController } from '../../../core/maintenance/controllers/base.controller';
import { SessionGuard } from '@hris/modules/system/user/guards/session.guard';
import { ApiResult, Pager } from '@hris/core/interfaces';
import { sanitizeResponseObject } from '@hris/core/utilities/sanitize-response-object';
import { getPagerDetails } from '@hris/core/utilities';
import * as _ from 'lodash';

@Controller('api/' + OrganisationUnit.plural)
export class OrganisationUnitsController extends MaintenanceBaseController<
  OrganisationUnit
> {
  constructor(private organisationUnitService: OrganisationUnitService) {
    super(organisationUnitService, OrganisationUnit);
  }
  @Get()
  @UseGuards(SessionGuard)
  async findAll(@Query() query): Promise<ApiResult> {
    if (_.has(query, 'paging') && query.paging === 'false') {
      const allContents: OrganisationUnit[] = await this.organisationUnitService.findAll();
      return {
        [OrganisationUnit.plural]: _.map(allContents, sanitizeResponseObject),
      };
    } else if (_.has(query, 'name')) {
      const foundName = await this.organisationUnitService.findOneByName(
        query?.name,
      );
      return { [OrganisationUnit.plural]: foundName };
    }
    const pagerDetails: Pager = getPagerDetails(query);

    const [entityRes, totalCount]: [
      OrganisationUnit[],
      number,
    ] = await this.organisationUnitService.findAndCount(
      query?.fields,
      query?.filter,
      pagerDetails?.pageSize,
      +pagerDetails?.page - 1,
    );
    return {
      pager: {
        ...pagerDetails,
        pageCount: entityRes?.length,
        total: totalCount,
        nextPage: `/api/${OrganisationUnit.plural}?page=${
          +pagerDetails.page + +'1'
        }`,
      },
      [OrganisationUnit.plural]: _.map(entityRes, sanitizeResponseObject),
    };
  }
}
