import { Controller } from '@nestjs/common';
import { ReportGroup } from '../entities/report.group.entity';
import { ReportGroupService } from '../services/reportgroup.service';
import { MaintenanceBaseController } from '../../../core/maintenance/controllers/base.controller';
import { BaseController } from '../../../core/controllers/base.contoller';

@Controller('api/' + ReportGroup.plural)
export class ReportGroupController extends BaseController<
  ReportGroup
> {
  constructor(reportGroupService: ReportGroupService) {
    super(reportGroupService, ReportGroup);
  }
}
