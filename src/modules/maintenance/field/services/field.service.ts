import { Injectable } from '@nestjs/common';
import { Field } from '../entities/field.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/core/services/base.service';
import { MaintenanceBaseService } from 'src/core/maintenance/services/base.service';

@Injectable()
export class FieldService extends MaintenanceBaseService<Field> {
    constructor(
        @InjectRepository(Field)
        repository: Repository<Field>,
    ) {
        super(repository, Field);
    }
}
