import { Controller, Post, UseGuards, Param, Body, Res, HttpStatus } from '@nestjs/common';
import { BaseController } from '../../../core/controllers/base.contoller';
import { DashboardService } from '../services/dashboard.service';
import { Dashboard } from '../entities/dashboard.entity';
import { MaintenanceBaseController } from '../../../core/maintenance/controllers/base.controller';
import { SessionGuard } from '../../system/user/guards/session.guard';
import { sanitizeResponseObject } from '../../../core/utilities/sanitize-response-object';

@Controller('api/' + Dashboard.plural)
export class DashboardController extends MaintenanceBaseController<Dashboard> {
  constructor(private dashboardService: DashboardService) {
    super(dashboardService, Dashboard);
  }
  @Post(':dashboard/sharing')
  @UseGuards(SessionGuard)
  async sessionDashboard(
    @Param() Param,
    @Body() dashboardSharingDTO: any,
    @Res() res,
  ) {
    try {
      const dasbhboard = await this.dashboardService.findOneDashboard(
        Param.dashboard,
      );
      const { user } = dashboardSharingDTO;
      const dasbhboardaccess = await this.dashboardService.SharedUser(user);

      if (dasbhboard && dasbhboardaccess === undefined) {
        const shareddashboard = await this.dashboardService.dashboardSharingCreation(
          Param.dashboard,
          dashboardSharingDTO,
        );
        return res
          .status(HttpStatus.CREATED)
          .send(sanitizeResponseObject(shareddashboard));
      }
      if (dasbhboard && dasbhboardaccess !== undefined) {
        const shareddashboard = await this.dashboardService.dashboardSharingEdit(
          Param.dashboard,
          dashboardSharingDTO,
        );
        return res
          .status(HttpStatus.CREATED)
          .send(sanitizeResponseObject(shareddashboard));
      }
    } catch (e) {
      return e;
    }
  }
}
