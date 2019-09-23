import {
  Body,
  Get,
  Post,
  Put,
  Param,
  Delete,
  Query,
  UseGuards,
  Res,
  Req,
} from '@nestjs/common';
import { BaseService } from '../services/base.service';
import { Pager, ApiResult } from '../interfaces';
import { getPagerDetails } from '../utilities';
import { HRISBaseEntity } from '../entities/base-entity';
import { SessionGuard } from 'src/modules/user/guards/session.guard';
import { Request, Response, response } from 'express';
import { DeleteResponse } from '../interfaces/response/delete.interface';
import {
  getSuccessResponse,
  deleteSuccessResponse,
  genericFailureResponse,
  postSuccessResponse,
  entityExistResponse,
} from '../helpers/response.helper';

export class BaseController<T extends HRISBaseEntity> {
  /**
   *
   * @param baseService
   * @param Model
   */
  constructor(
    private readonly baseService: BaseService<T>,
    private readonly Model: typeof HRISBaseEntity,
  ) { }

  /**
   *
   * @param query
   */
  @Get()
  @UseGuards(SessionGuard)
  async findAll(@Query() query): Promise<ApiResult> {
    if (query.paging === 'false') {
      const allContents: T[] = await this.baseService.findAll();
      return { [this.Model.plural]: allContents };
    }

    const pagerDetails: Pager = getPagerDetails(query);

    const [contents, totalCount]: [
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
        pageCount: contents.length,
        total: totalCount,
        nextPage: '/' + this.Model.plural + '?page=' + (pagerDetails.page + 1),
      },
      [this.Model.plural]: contents,
    };
  }

  /**
   *
   * @param req
   * @param res
   * @param params
   */
  @Get(':id')
  async findOne(
    @Req() req: Request,
    @Res() res: Response,
    @Param() params,
  ): Promise<ApiResult> {
    try {
      const isExist = await this.baseService.findOneByUid(params.id);
      const getResponse = isExist;
      if (isExist !== undefined) {
        return getSuccessResponse(res, getResponse);
      } else {
        return genericFailureResponse(req, res, params);
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
        return genericFailureResponse(req, res, params);
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
  async create(
    @Req() req: Request,
    @Res() res: Response,
    @Body() createEntityDto,
  ): Promise<ApiResult> {
    try {
      const isIDExist = await this.baseService.findOneById(createEntityDto.uid);
      if (isIDExist !== undefined) {
        return entityExistResponse(req, res, isIDExist);
      } else {
        const createdEntity = await this.baseService.create(createEntityDto);
        if (createdEntity !== undefined) {
          return postSuccessResponse(req, res, createdEntity);
        } else {
          return genericFailureResponse(req, res);
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
  async update(@Req() req: Request, @Res() res: Response, @Param() params, @Body() updateEntityDto): Promise<ApiResult> {
    const updateEntity = await this.baseService.findOneByUid(params.id);
    if (updateEntity !== undefined) {
      const payload = await this.baseService.update(params.id, updateEntityDto);
      if (payload) {
        return res.status(res.statusCode).json({ message: `Item with id ${params.id} updated successfully.`});
      }
    } else {
      return genericFailureResponse(req, res, params);
    }
  }

  /**
   *
   * @param params
   * @param req
   * @param res
   */
  @Delete(':id')
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
        return genericFailureResponse(req, res, params);
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
