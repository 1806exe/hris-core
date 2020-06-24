import { Controller, Get, Param, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { BaseController } from 'src/core/controllers/base.contoller';
import { getSuccessResponse } from 'src/core/helpers/response.helper';
import { ApiResult } from 'src/core/interfaces';
import { SessionGuard } from '../../../modules/system/user/guards/session.guard';
import { Report } from '../entities/report.entity';
import { ReportService } from '../services/report.service';

@Controller('api/' + Report.plural)
export class ReportController extends BaseController<Report> {
  constructor(private reportService: ReportService) {
    super(reportService, Report);
  }

  /**
   *
   * @param req
   * @param res
   * @param params
   */
  @Get('/sqlViews/:id/data')
  @UseGuards(SessionGuard)
  async getData(
    @Req() req: Request,
    @Res() res: Response,
    @Param() params,
  ): Promise<ApiResult> {
    try {
      return getSuccessResponse(
        res,
        await this.reportService.envokeSQL(params.id),
      );
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}
