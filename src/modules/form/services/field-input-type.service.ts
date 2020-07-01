import { Injectable } from '@nestjs/common';
import { FieldInputType } from '../entities/field-input-type.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '../../../core/services/base.service';

@Injectable()
export class FieldInputTypeService extends BaseService<
  FieldInputType
> {
  constructor(
    @InjectRepository(FieldInputType)
    fieldInputTypeRepository: Repository<FieldInputType>,
  ) {
    super(fieldInputTypeRepository, FieldInputType);
  }
}
