import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ReportGroup } from '../entities/report.group.entity';
import { MaintenanceBaseService } from 'src/core/maintenance/services/base.service';

@Injectable()
export class ReportGroupService extends MaintenanceBaseService<ReportGroup> {
    constructor(
        @InjectRepository(ReportGroup)
        reportGroupRepository: Repository<ReportGroup>,
    ) {
        super(reportGroupRepository, ReportGroup);
    }
}
