import { Controller } from '@nestjs/common';
import { BaseController } from 'src/core/controllers/base.contoller';

import { Field } from '../entities/field.entity';
import { FieldService } from '../services/field.service';
import { MaintenanceBaseController } from 'src/core/maintenance/controllers/base.controller';

@Controller('api/' + Field.plural)
export class FieldController extends MaintenanceBaseController<Field> {
  constructor(fieldService: FieldService) {
    super(fieldService, Field);
  }
}
