import { Controller } from '@nestjs/common';
import { BaseController } from '../../../core/controllers/base.contoller';
import { DashboardItemService } from '../services/dashboard-item.service';
import { DashboardItem } from '../entities/dashboard-item.entity';

@Controller('api/' + DashboardItem.plural)
export class DashboardItemController extends BaseController<DashboardItem> {
  constructor(dashboardItemService: DashboardItemService) {
    super(dashboardItemService, DashboardItem);
  }
}
