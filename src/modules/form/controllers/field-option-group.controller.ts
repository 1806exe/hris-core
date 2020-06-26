import { Controller } from '@nestjs/common';
import { BaseController } from '../../../core/controllers/base.contoller';

import { FieldOptionGroup } from '../entities/field-option-group.entity';
import { FieldOptionGroupService } from '../services/field-option-group.service';
import { MaintenanceBaseController } from '../../../core/maintenance/controllers/base.controller';
@Controller('api/' + FieldOptionGroup.plural)
export class FieldOptionGroupController extends MaintenanceBaseController<
  FieldOptionGroup
> {
  constructor(fieldOptionGroupService: FieldOptionGroupService) {
    super(fieldOptionGroupService, FieldOptionGroup);
  }
}
