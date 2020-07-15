import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '../../../core/services/base.service';
import { Repository } from 'typeorm';

import { FieldOptionChildren } from '../entities/field-option-children.entity';

@Injectable()
export class FieldOptionChildrenService extends BaseService<
  FieldOptionChildren
> {
  constructor(
    @InjectRepository(FieldOptionChildren)
    repository: Repository<FieldOptionChildren>,
  ) {
    super(repository, FieldOptionChildren);
  }
}
