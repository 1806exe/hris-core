import { Injectable } from '@nestjs/common';
import { Form } from '../entities/form.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '../../../core/services/base.service';
import { MaintenanceBaseService } from '../../../core/maintenance/services/base.service';

@Injectable()
export class FormService extends MaintenanceBaseService<Form> {
    constructor(
        @InjectRepository(Form)
        repository: Repository<Form>,
    ) {
        super(repository, Form);
    }
}


