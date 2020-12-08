import {
  Controller,
  Get,
  HttpStatus,
  Param,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { sanitizeResponseObject } from 'src/core/utilities/sanitize-response-object';
import { generateUidRandomUids } from '../../../core/helpers/makeuid';
import {
  genericFailureResponse,
  getSuccessResponse,
} from '../../../core/helpers/response.helper';
import { ApiResult } from '../../../core/interfaces';
import { SessionGuard } from '../../system/user/guards/session.guard';

import { SystemSetting } from '../entities/system-setting.entity';
import { SystemInfoService } from '../services/system-info.service';
@Controller('api/system')

// @UseGuards(AuthGuard())
export class SystemInfoController {
  constructor(private readonly systemInfoService: SystemInfoService) {
    // super(systemInfoService, SystemInfo);
  }

  @Get('info')
  @UseGuards(SessionGuard)
  async findOne(
    @Req() req: Request,
    @Res() res: Response,
    @Param() params,
  ): Promise<ApiResult> {
    try {
      const isExist = await this.systemInfoService.find();
      const getResponse = isExist;
      if (isExist !== undefined) {
        return getSuccessResponse(res, getResponse);
      } else {
        return genericFailureResponse(res, params);
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  @Get('id')
  async generateRandomUids(@Query() query, @Res() res: Response): Promise<any> {
    if (query.limit) {
      return res
        .status(HttpStatus.OK)
        .send(generateUidRandomUids(query?.limit));
    } else {
      return res.status(HttpStatus.OK).send(generateUidRandomUids(1));
    }
  }
}
