import { Injectable } from '@nestjs/common';
import { FormVisibleField } from '../entities/form-visible-fields.entity';
import { BaseService } from '../../../core/services/base.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FormVisibleFieldService extends BaseService<FormVisibleField> {
  constructor(
    @InjectRepository(FormVisibleField)
    repository: Repository<FormVisibleField>,
  ) {
    super(repository, FormVisibleField);
  }
}
