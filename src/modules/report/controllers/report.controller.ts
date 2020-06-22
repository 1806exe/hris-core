import { Get, Param, UseGuards, Res, Req, Controller } from '@nestjs/common';
import { Request, Response } from 'express';
import { ReportService } from '../services/report.service';
import { Report } from '../entities/report.entity';
import { SessionGuard } from '../../../modules/system/user/guards/session.guard';
import { ApiResult } from 'src/core/interfaces';
import { getSuccessResponse } from 'src/core/helpers/response.helper';
import { MaintenanceBaseController } from 'src/core/maintenance/controllers/base.controller';

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
