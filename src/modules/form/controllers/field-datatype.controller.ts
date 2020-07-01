import { Controller } from '@nestjs/common';
import { BaseController } from '../../../core/controllers/base.contoller';

import { FieldDataType } from '../entities/field-datatype.entity';
import { FieldDataTypeService } from '../services/field-datatype.service';

@Controller('api/' + FieldDataType.plural)
export class FieldDatatypeController extends BaseController<FieldDataType> {
  constructor(fieldDataTypeService: FieldDataTypeService) {
    super(fieldDataTypeService, FieldDataType);
  }
}
