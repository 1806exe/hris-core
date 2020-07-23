import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MaintenanceBaseService } from '../../../../core/maintenance/services/base.service';
import { RecordRuleAction } from '../../entities/record-rule-action/record-rule-action.entity';

@Injectable()
export class RecordRuleActionService extends MaintenanceBaseService<
  RecordRuleAction
> {
  constructor(
    @InjectRepository(RecordRuleAction)
    recordRuleActionRepository: Repository<RecordRuleAction>,
  ) {
    super(recordRuleActionRepository, RecordRuleAction);
  }
}
