import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/core/services/base.service';
import { Repository } from 'typeorm';

import { FieldOptionGroup } from '../entities/field-option-group.entity';
import { MaintenanceBaseService } from 'src/core/maintenance/services/base.service';

@Injectable()
export class FieldOptionGroupService extends MaintenanceBaseService<FieldOptionGroup> {
  constructor(
    @InjectRepository(FieldOptionGroup)
    fieldOptionGroupRepository: Repository<FieldOptionGroup>,
  ) {
    super(fieldOptionGroupRepository, FieldOptionGroup);
  }
}
