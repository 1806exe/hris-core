import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '../../../core/services/base.service';
import { Repository } from 'typeorm';

import { FieldOption } from '../entities/field-option.entity';
import { MaintenanceBaseService } from '../../../core/maintenance/services/base.service';

@Injectable()
export class FieldOptionService extends MaintenanceBaseService<FieldOption> {
  constructor(
    @InjectRepository(FieldOption)
    fieldOptionRepository: Repository<FieldOption>,
  ) {
    super(fieldOptionRepository, FieldOption);
  }
}
