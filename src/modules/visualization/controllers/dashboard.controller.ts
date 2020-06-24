import { Controller } from '@nestjs/common';
import { BaseController } from 'src/core/controllers/base.contoller';
import { DashboardService } from '../services/dashboard.service';
import { Dashboard } from '../entities/dashboard.entity';
import { MaintenanceBaseController } from 'src/core/maintenance/controllers/base.controller';

@Controller('api/' + Dashboard.plural)
export class DashboardController extends MaintenanceBaseController<Dashboard> {
  constructor(service: DashboardService) {
    super(service, Dashboard);
  }
}
