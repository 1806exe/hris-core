import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/core/services/base.service';
import { Repository } from 'typeorm';

import { Field } from '../entities/field.entity';
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
