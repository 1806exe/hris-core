import { Controller } from '@nestjs/common';
import { BaseController } from 'src/core/controllers/base.contoller';

import { FieldOption } from '../entities/field-option.entity';
import { FieldOptionService } from '../services/field-option.service';
import { MaintenanceBaseController } from 'src/core/maintenance/controllers/base.controller';

@Controller('api/' + FieldOption.plural)
export class FieldOptionController extends MaintenanceBaseController<
  FieldOption
> {
  constructor(service: FieldOptionService) {
    super(service, FieldOption);
  }
}
