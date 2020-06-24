import { Controller } from '@nestjs/common';
import { FormFieldMember } from '../entities/form-field-member.entity';
import { FormFieldMemberService } from '../services/form-field-member.service';
import { MaintenanceBaseController } from 'src/core/maintenance/controllers/base.controller';

@Controller('api/' + FormFieldMember.plural)
export class FormFieldMemberController extends MaintenanceBaseController<
  FormFieldMember
> {
  constructor(service: FormFieldMemberService) {
    super(service, FormFieldMember);
  }
}
