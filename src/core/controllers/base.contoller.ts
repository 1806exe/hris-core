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
  Logger,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import * as _ from 'lodash';
import { SessionGuard } from '../../modules/system/user/guards/session.guard';

import { HRISBaseEntity } from '../entities/base-entity';
import {
  deleteSuccessResponse,
  entityExistResponse,
  genericFailureResponse,
  getSuccessResponse,
  postSuccessResponse,
} from '../helpers/response.helper';
import { ApiResult } from '../interfaces';
import { DeleteResponse } from '../interfaces/response/delete.interface';
import { BaseService } from '../services/base.service';
import { getPagerDetails } from '../utilities';
import { sanitizeResponseObject } from '../utilities/sanitize-response-object';

export class BaseController<T extends HRISBaseEntity> {
  /**
   *
   * @param baseService
   * @param Model
   */
  constructor(
    private readonly baseService: BaseService<T>,
    private readonly Model: typeof HRISBaseEntity,
  ) {}

  /**
   *
   * @param query
   */
  @Get()
  @UseGuards(SessionGuard)
  async findAll(@Query() query): Promise<ApiResult> {
    if (query.paging === 'false') {
      const allContents: T[] = await this.baseService.findAll();
      return {
        [this.Model.plural]: _.map(allContents, sanitizeResponseObject),
      };
    }

    const pagerDetails: any = getPagerDetails(query);

    const [entityRes, totalCount]: [
      T[],
      number,
    ] = await this.baseService.findAndCount(
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
        nextPage: `/api/${this.Model.plural}?page=${
          parseInt(pagerDetails.page) + 1
        }`,
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
  async findOne(@Res() res: Response, @Param() params): Promise<ApiResult> {
    const results = await this.baseService.findOneByUid(params.id);

    return getSuccessResponse(res, sanitizeResponseObject(results));
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
      const isExist = await this.baseService.findOneByUid(params.id);
      const getResponse = isExist;
      if (isExist !== undefined) {
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
      const isIDExist = await this.baseService.findOneByUid(createEntityDto.id);
      if (isIDExist !== undefined) {
        return entityExistResponse(res, isIDExist);
      } else {
        const createdEntity = await this.baseService.create(createEntityDto);
        if (createdEntity !== undefined) {
          const isPropExcluded = delete createdEntity.id;
          return isPropExcluded
            ? postSuccessResponse(res, createdEntity)
            : postSuccessResponse(res, createdEntity);
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
    @Param() params,
    @Body() updateEntityDto,
  ): Promise<ApiResult> {
    const updateEntity = await this.baseService.findOneByUid(params.id);
    if (updateEntity !== undefined) {
      const resolvedEntityDTO: any = await this.baseService.EntityUidResolver(
        updateEntityDto,
        updateEntity,
      );
      // ! Removed Update Based By UID params and update automatically
      // ! By following the criteria if the uid exist the it will update
      // ! The item but if it is new then it will create new item
      console.log(resolvedEntityDTO);
      const payload = await this.baseService.update(resolvedEntityDTO);
      if (payload) {
        return res
          .status(res.statusCode)
          .json({ message: `Item with id ${params.id} updated successfully.` });
      }
    } else {
      return genericFailureResponse(res, params);
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
      const isExist = await this.baseService.findOneByUid(params.id);
      if (isExist !== undefined) {
        const deleteResponse: DeleteResponse = await this.baseService.delete(
          params.id,
        );
        return deleteSuccessResponse(req, res, params, deleteResponse);
      } else {
        return genericFailureResponse(res, params);
      }
    } catch (error) {
      return res
        .status(HttpStatus.NOT_FOUND)
        .send(`A property with ID ${params.id} is not available`);
    }
  }

  // TODO: give descriptive name for this method
  get plural() {
    throw Error('Plural Not set');
    return 'undefined';
  }
}
