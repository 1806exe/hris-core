import { Controller } from '@nestjs/common';
import { FormVisibleField } from '../entities/form-visible-fields.entity';
import { BaseController } from '../../../core/controllers/base.contoller';
import { FormVisibleFieldService } from '../services/form-visible-fields.service';

@Controller('api/' + FormVisibleField.plural)
export class FormVisibleFieldController extends BaseController<
  FormVisibleField
> {
  constructor(service: FormVisibleFieldService) {
    super(service, FormVisibleField);
  }
}
