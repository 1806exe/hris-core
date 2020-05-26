import { Controller } from '@nestjs/common';
import { BaseController } from 'src/core/controllers/base.contoller';

import { FieldGroupSet } from '../entities/field-groupset.entity';
import { FieldGroupSetService } from '../services/field-group-set.service';
import { MaintenanceBaseController } from 'src/core/maintenance/controllers/base.contoller';

@Controller('api/' + FieldGroupSet.plural)
export class FieldGroupSetController extends MaintenanceBaseController<FieldGroupSet> {
  constructor(fieldGroupSetService: FieldGroupSetService) {
    super(fieldGroupSetService, FieldGroupSet);
  }
}
