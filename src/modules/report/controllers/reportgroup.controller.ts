import { Controller } from '@nestjs/common';
import { ReportGroup } from '../entities/report.group.entity';
import { ReportGroupService } from '../services/reportgroup.service';
import { MaintenanceBaseController } from '../../../core/maintenance/controllers/base.contoller';

@Controller('api/' + ReportGroup.plural)
export class ReportGroupController extends MaintenanceBaseController<
ReportGroup
> {
    constructor(reportGroupService: ReportGroupService) {
        super(reportGroupService, ReportGroup);
    }
}
