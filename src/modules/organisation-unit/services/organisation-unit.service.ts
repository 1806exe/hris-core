import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as _ from 'lodash';
import { UIDToIDTransformation } from '@icodebible/utils/resolvers/uid-to-id';

import { OrganisationUnit } from '../entities/organisation-unit.entity';
import { MaintenanceBaseService } from '../../../core/maintenance/services/base.service';
import { entityTableMapper } from '../../../core/resolvers/database-table.resolver';
import {
  getSelections,
  getRelations,
} from '../../../core/utilities/get-fields.utility';
import { getWhereConditions } from '../../../core/utilities';
import { GetResponseSanitizer } from '@icodebible/utils/resolvers/id-to-uid';
import { fil } from 'date-fns/locale';

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
  async findAndCount(
    fields,
    filter,
    size,
    page,
  ): Promise<[OrganisationUnit[], number]> {
    const metaData = this.organisationUnitRepository.manager.connection.getMetadata(
      OrganisationUnit,
    );
    console.log('Fields', fields);
    let join: any = {};

    //TODO: Find best way to join any recursive relation
    if (metaData.tableName === 'organisationunit') {
      join = {
        alias: 'organisationunit',
        leftJoinAndSelect: {
          profile: 'organisationunit.parent',
        },
      };
    }
    const parent = filter.includes('parent.id:eq:');
    if (parent) {
      const parents = await this.organisationUnitRepository.findOne({
        where: { uid: filter.replace(/^parent.id:eq:+/i, '') },
      });
      const [response, totalCount] = await this.modelRepository.findAndCount({
        select: getSelections(fields, metaData),
        relations: getRelations(fields, metaData),
        where: { parent: parents },
        take: size,
        join,
        skip: page * size,
      });
      return [
        await GetResponseSanitizer(
          this.modelRepository,
          response,
          entityTableMapper,
        ),
        totalCount,
      ];
    }
    const [response, totalCount] = await this.modelRepository.findAndCount({
      select: getSelections(fields, metaData),
      relations: getRelations(fields, metaData),
      where: getWhereConditions(filter),
      take: size,
      join,
      skip: page * size,
    });

    /**
     *
     */

    return [
      await GetResponseSanitizer(
        this.modelRepository,
        response,
        entityTableMapper,
      ),
      totalCount,
    ];
  }
}
