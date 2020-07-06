import { Controller } from '@nestjs/common';
import { RecordRuleAction } from '../../entities/record-rule-action/record-rule-action.entity';
import { MaintenanceBaseController } from '@hris/core/maintenance/controllers/base.controller';
import { RecordRuleActionService } from '../../services/record-rule-action/record-rule-action.service';

@Controller('api/' + RecordRuleAction.plural)
export class RecordRuleActionController extends MaintenanceBaseController<
RecordRuleAction
> {
    constructor(recordValueActionService: RecordRuleActionService) {
        super(recordValueActionService, RecordRuleAction);
    }
}
