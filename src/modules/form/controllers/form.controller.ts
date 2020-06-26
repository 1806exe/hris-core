import { Controller } from '@nestjs/common';
import { Form } from '../entities/form.entity';
import { BaseController } from '../../../core/controllers/base.contoller';
import { FormService } from '../services/form.service';
import { MaintenanceBaseController } from '../../../core/maintenance/controllers/base.contoller';

@Controller('api/' + Form.plural)
export class FormController extends MaintenanceBaseController<Form> {
    constructor(service: FormService) {
        super(service, Form);
    }
}