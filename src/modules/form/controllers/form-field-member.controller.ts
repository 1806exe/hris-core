import { Controller } from '@nestjs/common';
import { FormFieldMember } from '../entities/form-field-member.entity';
import { FormFieldMemberService } from '../services/form-field-member.service';
import { MaintenanceBaseController } from '../../../core/maintenance/controllers/base.contoller';

@Controller('api/' + FormFieldMember.plural)
export class FormFieldMemberController extends MaintenanceBaseController<FormFieldMember> {
    constructor(service: FormFieldMemberService) {
        super(service, FormFieldMember);
    }
}