import { Controller } from '@nestjs/common';
import { BaseController } from '../../../core/controllers/base.contoller';

import { FieldRelation } from '../entities/field-relation.entity';
import { FieldRelationService } from '../services/field-relation.service';

@Controller('api/' + FieldRelation.plural)
export class FieldRelationController extends BaseController<FieldRelation> {
  constructor(fieldRelationService: FieldRelationService) {
    super(fieldRelationService, FieldRelation);
  }
}
