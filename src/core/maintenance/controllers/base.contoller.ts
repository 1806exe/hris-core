import {
  Body,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import * as _ from 'lodash';
import { HRISBaseEntity } from 'src/core/entities/base-entity';
import { ApiResult, Pager } from 'src/core/interfaces';
import { DeleteResponse } from 'src/core/interfaces/response/delete.interface';
import { getPagerDetails } from 'src/core/utilities';
import { sanitizeResponseObject } from 'src/core/utilities/sanitize-response-object';
import { SessionGuard } from 'src/modules/system/user/guards/session.guard';
import { ObjectPropsResolver } from '@icodebible/utils/resolvers';
import { MaintenanceBaseService } from '../services/base.service';
import { PayloadConfig } from 'src/core/config/payload.config';
import { getSuccessResponse, genericFailureResponse, entityExistResponse, postSuccessResponse, deleteSuccessResponse } from 'src/core/helpers/maintenance-response.helper';

export class MaintenanceBaseController<T extends HRISBaseEntity> {
  /**
   *
   * @param maintenanceBaseService
   * @param Model
   */
  constructor(
    private readonly maintenanceBaseService: MaintenanceBaseService<T>,
    private readonly Model: typeof HRISBaseEntity,
  ) {}

  /**
   *
   * @param query
   */
  @Get()
  @UseGuards(SessionGuard)
  async findAll(@Query() query): Promise<ApiResult> {
    if (_.has(query, 'paging') && query.paging === 'false') {
      const allContents: T[] = await this.maintenanceBaseService.findAll();
      return {
        [this.Model.plural]: _.map(allContents, sanitizeResponseObject),
      };
    } else if (_.has(query, 'name')) {
      const foundName = await this.maintenanceBaseService.findOneByName(
        query.name,
      );
      return { [this.Model.plural]: foundName };
    }

    const pagerDetails: Pager = getPagerDetails(query);

    const [entityRes, totalCount]: [
      T[],
      number,
    ] = await this.maintenanceBaseService.findAndCount(
      query.fields,
      query.filter,
      pagerDetails.pageSize,
      pagerDetails.page - 1,
    );

    return {
      pager: {
        ...pagerDetails,
        pageCount: entityRes.length,
        total: totalCount,
        nextPage: `/api/${this.Model.plural}?page=${pagerDetails.page + 1}`,
      },
      [this.Model.plural]: _.map(entityRes, sanitizeResponseObject),
    };
  }

  /**
   *
   * @param req
   * @param res
   * @param params
   */
  @Get(':id')
  @UseGuards(SessionGuard)
  async findOne(
    @Req() req: Request,
    @Res() res: Response,
    @Param() param,
  ): Promise<ApiResult> {
    try {
      const isEntityExist = await this.maintenanceBaseService.findOneByUid(
        param,
      );
      const getResponse = isEntityExist;
      if (isEntityExist !== undefined) {
        return getSuccessResponse(res, sanitizeResponseObject(getResponse));
      } else {
        return genericFailureResponse(res, param);
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  /**
   *
   * @param req
   * @param res
   * @param params
   */
  @Get(':id/:relation')
  @UseGuards(SessionGuard)
  async findOneRelation(
    @Req() req: Request,
    @Res() res: Response,
    @Param() params,
  ): Promise<ApiResult> {
    try {
      const isEntityExist = await this.maintenanceBaseService.findOneByUid(
        params.id,
      );
      const getResponse = isEntityExist;
      if (isEntityExist !== undefined) {
        return { [params.relation]: getResponse[params.relation] };
      } else {
        return genericFailureResponse(res, params);
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  /**
   *
   * @param req
   * @param res
   * @param createEntityDto
   */
  @Post()
  @UseGuards(SessionGuard)
  async create(
    @Req() req: Request,
    @Res() res: Response,
    @Body() createEntityDto,
  ): Promise<ApiResult> {
    try {
      const procCreateEntityDTO = await ObjectPropsResolver(
        createEntityDto,
        PayloadConfig,
      );
      const isIDExist = await this.maintenanceBaseService.findOneByUid(
        procCreateEntityDTO,
      );
      if (isIDExist !== undefined) {
        return entityExistResponse(res, isIDExist);
      } else {
        const createdEntity = await this.maintenanceBaseService.create(
          procCreateEntityDTO,
        );
        if (createdEntity !== undefined) {
          const omitId = await _.omit(createdEntity, ['id']);
          const sanitizedCreatedEntity = _.mapKeys(omitId, (value, key) => {
            return key === 'uid' ? 'id' : key;
          });
          return postSuccessResponse(res, sanitizedCreatedEntity);
        } else {
          return genericFailureResponse(res);
        }
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  /**
   *
   * @param params
   * @param updateEntityDto
   */
  @Put(':id')
  @UseGuards(SessionGuard)
  async update(
    @Req() req: Request,
    @Res() res: Response,
    @Param() param,
    @Body() updateEntityDto,
  ): Promise<ApiResult> {
    const updateEntity = await this.maintenanceBaseService.findOneByUid(param);
    if (updateEntity !== undefined) {
      const resolvedUpdateEntityDto = await ObjectPropsResolver(
        updateEntityDto,
        PayloadConfig,
      );
      // ! Removed Update Based By UID params and update automatically
      // ! By following the criteria if the uid exist the it will update
      // ! The item but if it is new then it will create new item
      const payload = await this.maintenanceBaseService.update(
        updateEntity,
        resolvedUpdateEntityDto,
      );
      if (payload) {
        const omitId = _.omit(payload, ['id']);
        const renameUIDToID = _.mapKeys(omitId, (value, key) => {
          return key === 'uid' ? 'id' : key;
        });
        return res.status(res.statusCode).json({
          payload: renameUIDToID,
          message: `Item with id ${param.id} updated successfully.`,
        });
      } else {
        return res.status(res.statusCode).json({
          message: `No payload`,
        });
      }
    } else {
      return genericFailureResponse(res, param);
    }
    return null;
  }

  /**
   *
   * @param params
   * @param req
   * @param res
   */
  @Delete(':id')
  @UseGuards(SessionGuard)
  async delete(
    @Param() params,
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<ApiResult> {
    try {
      const isEntityExist: any = await this.maintenanceBaseService.findOneByUid(
        params,
      );
      if (isEntityExist !== undefined) {
        const deleteResponse: DeleteResponse = await this.maintenanceBaseService.delete(
          isEntityExist.id,
        );
        const omittedId = await _.omit(isEntityExist, ['id']);
        const sanitizedDeletedEntity = _.mapKeys(omittedId, (value, key) => {
          return key === 'uid' ? 'id' : key;
        });
        return deleteSuccessResponse(
          req,
          res,
          params,
          deleteResponse,
          sanitizedDeletedEntity,
        );
      } else {
        return genericFailureResponse(res, params);
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // TODO: give descriptive name for this method
  get plural() {
    throw Error('Plural Not set');
    return 'undefined';
  }
}
