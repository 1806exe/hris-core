import { Injectable } from '@nestjs/common';
import { FormFieldMember } from '../entities/form-field-member.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { MaintenanceBaseService } from '../../../core/maintenance/services/base.service';

@Injectable()
export class FormFieldMemberService extends MaintenanceBaseService<FormFieldMember> {
    constructor(
        @InjectRepository(FormFieldMember)
        repository: Repository<FormFieldMember>,
    ) {
        super(repository, FormFieldMember);
    }
}