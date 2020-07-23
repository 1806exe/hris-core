import { Controller } from '@nestjs/common';
import { FormSectionFieldMember } from '../entities/formsection-fieldmembers.entity';
import { BaseController } from '../../../core/controllers/base.contoller';
import { FormService } from '../services/form.service';
import { FormSectionFieldMemberService } from '../services/formsection-fieldmembers.service';

@Controller('api/' + FormSectionFieldMember.plural)
export class FormSectionFieldMemberController extends BaseController<
  FormSectionFieldMember
> {
  constructor(service: FormSectionFieldMemberService) {
    super(service, FormSectionFieldMember);
  }
}
