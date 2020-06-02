import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/core/services/base.service';
import { Repository } from 'typeorm';

import { FieldGroup } from '../entities/field-group.entity';
import { MaintenanceBaseService } from 'src/core/maintenance/services/base.service';

@Injectable()
export class FieldGroupService extends MaintenanceBaseService<FieldGroup> {
  constructor(
    @InjectRepository(FieldGroup)
    repository: Repository<FieldGroup>,
  ) {
    super(repository, FieldGroup);
  }
}
