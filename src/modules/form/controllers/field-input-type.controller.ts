import { Controller } from '@nestjs/common';
import { FieldInputType } from '../entities/field-input-type.entity';
import { FieldInputTypeService } from '../services/field-input-type.service';
import { BaseController } from '../../../core/controllers/base.contoller';

@Controller('api/' + FieldInputType.plural)
export class FieldInputTypeController extends BaseController<
  FieldInputType
> {
  constructor(fieldInputTypeService: FieldInputTypeService) {
    super(fieldInputTypeService, FieldInputType);
  }
}
