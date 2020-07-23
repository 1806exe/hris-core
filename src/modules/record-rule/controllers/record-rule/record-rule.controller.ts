import { Controller } from '@nestjs/common';
import { MaintenanceBaseController } from '../../../../core/maintenance/controllers/base.controller';
import { RecordRule } from '../../entities/record-rule/record-rule.entity';
import { RecordRuleService } from '../../services/record-rule/record-rule.service';

@Controller('api/' + RecordRule.plural)
export class RecordRuleController extends MaintenanceBaseController<
  RecordRule
> {
  constructor(recordValueService: RecordRuleService) {
    super(recordValueService, RecordRule);
  }
}
