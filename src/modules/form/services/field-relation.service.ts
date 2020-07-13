import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '../../../core/services/base.service';
import { Repository } from 'typeorm';

import { FieldRelation } from '../entities/field-relation.entity';

@Injectable()
export class FieldRelationService extends BaseService<FieldRelation> {
  constructor(
    @InjectRepository(FieldRelation)
    fieldRelationRepository: Repository<FieldRelation>,
  ) {
    super(fieldRelationRepository, FieldRelation);
  }
}
