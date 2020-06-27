import { Injectable } from '@nestjs/common';
import { FormSection } from '../entities/form-section.entity';
import { BaseService } from '../../../core/services/base.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FormSectionService extends BaseService<FormSection> {
    constructor(
        @InjectRepository(FormSection)
        repository: Repository<FormSection>,
    ) {
        super(repository, FormSection);
    }
}