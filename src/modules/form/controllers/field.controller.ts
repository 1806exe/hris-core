import { Controller } from '@nestjs/common';
import { BaseController } from '../../../core/controllers/base.contoller';

import { Field } from '../entities/field.entity';
import { FieldService } from '../services/field.service';
import { MaintenanceBaseController } from '../../../core/maintenance/controllers/base.contoller';

@Controller('api/' + Field.plural)
export class FieldController extends MaintenanceBaseController<Field> {
  constructor(fieldService: FieldService) {
    super(fieldService, Field);
  }
}
