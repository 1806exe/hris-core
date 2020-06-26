import { Controller } from '@nestjs/common';
import { BaseController } from '../../../core/controllers/base.contoller';

import { FieldOptionGroupSet } from '../entities/field-option-group-set.entity';
import { FieldOptionGroupSetService } from '../services/field-option-group-set.service';
import { MaintenanceBaseController } from '../../../core/maintenance/controllers/base.contoller';

@Controller('api/' + FieldOptionGroupSet.plural)
export class FieldOptionGroupSetController extends MaintenanceBaseController<
  FieldOptionGroupSet
> {
  constructor(fieldOptionGroupSetService: FieldOptionGroupSetService) {
    super(fieldOptionGroupSetService, FieldOptionGroupSet);
  }
}
