import { Controller } from '@nestjs/common';
import { BaseController } from '../../../core/controllers/base.contoller';

import { FieldOptionMerge } from '../entities/field-option-merge.entity';
import { FieldOptionMergeService } from '../services/field-option-merge.service';

@Controller('api/' + FieldOptionMerge.plural)
export class FieldOptionMergeController extends BaseController<
  FieldOptionMerge
> {
  constructor(fieldOptionMergeService: FieldOptionMergeService) {
    super(fieldOptionMergeService, FieldOptionMerge);
  }
}
