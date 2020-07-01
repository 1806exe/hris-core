import { Controller } from '@nestjs/common';
import { MaintenanceBaseController } from '../../../core/maintenance/controllers/base.controller';
import { FieldGroup } from '../entities/field-group.entity';
import { FieldGroupService } from '../services/field-group.service';

@Controller('api/' + FieldGroup.plural)
export class FieldGroupController extends MaintenanceBaseController<
  FieldGroup
> {
  constructor(fieldGroupService: FieldGroupService) {
    super(fieldGroupService, FieldGroup);
  }
}
