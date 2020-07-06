import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { MaintenanceBaseService } from '@hris/core/maintenance/services/base.service';
import { RecordRule } from '../../entities/record-rule/record-rule.entity';

@Injectable()
export class RecordRuleService extends MaintenanceBaseService<RecordRule> {
    constructor(
        @InjectRepository(RecordRule)
        recordRuleRepository: Repository<RecordRule>,
    ) {
        super(recordRuleRepository, RecordRule);
    }
}
