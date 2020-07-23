import { Injectable } from '@nestjs/common';
import { FormSectionFieldMember } from '../entities/formsection-fieldmembers.entity';
import { Repository } from 'typeorm';
import { BaseService } from '../../../core/services/base.service';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FormSectionFieldMemberService extends BaseService<
  FormSectionFieldMember
> {
  constructor(
    @InjectRepository(FormSectionFieldMember)
    repository: Repository<FormSectionFieldMember>,
  ) {
    super(repository, FormSectionFieldMember);
  }
}
