import { Controller } from '@nestjs/common';
import { BaseController } from '../../../core/controllers/base.contoller';

import { FieldGroup } from '../entities/field-group.entity';
import { FieldGroupService } from '../services/field-group.service';
import { MaintenanceBaseController } from '../../../core/maintenance/controllers/base.contoller';

@Controller('api/' + FieldGroup.plural)
export class FieldGroupController extends MaintenanceBaseController<FieldGroup> {
  constructor(fieldGroupService: FieldGroupService) {
    super(fieldGroupService, FieldGroup);
  }
}
