import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '../../../core/services/base.service';
import { Repository } from 'typeorm';

import { FieldOptionMerge } from '../entities/field-option-merge.entity';

@Injectable()
export class FieldOptionMergeService extends BaseService<FieldOptionMerge> {
  constructor(
    @InjectRepository(FieldOptionMerge)
    fieldOptionMergeRepository: Repository<FieldOptionMerge>,
  ) {
    super(fieldOptionMergeRepository, FieldOptionMerge);
  }
}
