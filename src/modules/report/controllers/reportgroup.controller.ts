import { Controller } from '@nestjs/common';
import { ReportGroup } from '../entities/report.group.entity';
import { ReportGroupService } from '../services/reportgroup.service';
import { MaintenanceBaseController } from 'src/core/maintenance/controllers/base.controller';

@Controller('api/' + ReportGroup.plural)
export class ReportGroupController extends MaintenanceBaseController<
  ReportGroup
> {
  constructor(reportGroupService: ReportGroupService) {
    super(reportGroupService, ReportGroup);
  }
}
