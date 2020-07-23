import { Controller } from '@nestjs/common';
import { FormSection } from '../entities/form-section.entity';
import { FormSectionService } from '../services/form-section.service';
import { BaseController } from '../../../core/controllers/base.contoller';

@Controller('api/' + FormSection.plural)
export class FormSectionController extends BaseController<FormSection> {
  constructor(service: FormSectionService) {
    super(service, FormSection);
  }
}
