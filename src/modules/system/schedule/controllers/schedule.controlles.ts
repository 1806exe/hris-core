import { Controller, Res, Req, Body, Logger, Post } from '@nestjs/common';
import { ScheduleService } from '../services/schedule.service';
import { BaseController } from '../../../../core/controllers/base.contoller';
import { Schedule } from '../entities/schedule.entity';
import { Request, Response } from 'express';
import {
  entityExistResponse,
  postSuccessResponse,
  genericFailureResponse,
} from '../../../../core/helpers/response.helper';
import { ApiInternalServerErrorResponse } from '@nestjs/swagger';
import { ApiResult } from '../../../../core/interfaces';

@Controller('api/' + Schedule.plural)
export class ScheduleController extends BaseController<Schedule> {
  constructor(private scheduleService: ScheduleService) {
    super(scheduleService, Schedule);
  }
  @Post()
  async create(
    @Req() req: Request,
    @Res() res: Response,
    @Body() createEntityDto,
  ): Promise<ApiResult> {
    try {
      const isIDExist = await this.scheduleService.findOneByUid(
        createEntityDto.id,
      );
      if (isIDExist !== undefined) {
        return entityExistResponse(res, isIDExist);
      } else {
        const createdEntity = await this.scheduleService.create(
          createEntityDto,
        );
        this.scheduleService.addCronJob(createdEntity);
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
      Logger.error(`[HRIS API] ${error}`);
      res.status(400).json({ error: error.message });
    }
  }
}
