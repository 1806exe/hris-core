import { Controller } from '@nestjs/common';

import { FieldGroupSet } from '../entities/field-groupset.entity';
import { FieldGroupSetService } from '../services/field-group-set.service';
import { MaintenanceBaseController } from '../../../core/maintenance/controllers/base.controller';
@Controller('api/' + FieldGroupSet.plural)
export class FieldGroupSetController extends MaintenanceBaseController<
  FieldGroupSet
> {
  constructor(fieldGroupSetService: FieldGroupSetService) {
    super(fieldGroupSetService, FieldGroupSet);
  }
}
