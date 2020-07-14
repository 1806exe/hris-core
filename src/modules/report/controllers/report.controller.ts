import { Controller, Get, Param, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { ReportService } from '../services/report.service';
import { Report } from '../entities/report.entity';
import { SessionGuard } from '../../system/user/guards/session.guard';
import { ApiResult } from '../../../core/interfaces';
import { getSuccessResponse } from '../../../core/helpers/response.helper';
import { MaintenanceBaseController } from '../../../core/maintenance/controllers/base.controller';

@Controller('api/' + Report.plural)
export class ReportController extends MaintenanceBaseController<Report> {
  constructor(private reportService: ReportService) {
    super(reportService, Report);
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
