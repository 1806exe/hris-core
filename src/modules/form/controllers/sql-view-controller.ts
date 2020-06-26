import { Controller } from '@nestjs/common';
import { Get, Param, UseGuards, Res, Req } from '@nestjs/common';
import { Request, Response } from 'express';
import { BaseController } from '../../../core/controllers/base.contoller';
import { SqlView } from '../entities/sqlview.entity';
import { SqlViewService } from '../services/sql-view.service';
import { SessionGuard } from '../../../modules/system/user/guards/session.guard';
import { ApiResult } from '../../../core/interfaces';
import {
  getSuccessResponse,
  genericFailureResponse,
} from '../../../core/helpers/response.helper';

@Controller('api/' + SqlView.plural)
export class SqlViewController extends BaseController<SqlView> {
  constructor(private service: SqlViewService) {
    super(service, SqlView);
  }

  /**
   *
   * @param req
   * @param res
   * @param params
   */
  @Get(':id/data')
    @UseGuards(SessionGuard)
    async getData(
        //@Req() req: Request,
        @Res() res: Response,
        @Param() params,
    ): Promise<ApiResult> {
        try {
            return getSuccessResponse(res, await this.service.envokeSQL(params.id));
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}
