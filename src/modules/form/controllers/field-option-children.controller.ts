import { Controller } from '@nestjs/common';
import { BaseController } from '../../../core/controllers/base.contoller';

import { FieldOptionChildren } from '../entities/field-option-children.entity';
import { FieldOptionChildrenService } from '../services/field-option-children.service';

@Controller('api/' + FieldOptionChildren.plural)
export class FieldOptionChildrenController extends BaseController<
  FieldOptionChildren
> {
  constructor(fieldOptionChildrenService: FieldOptionChildrenService) {
    super(fieldOptionChildrenService, FieldOptionChildren);
  }
}
