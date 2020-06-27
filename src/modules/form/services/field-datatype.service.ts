import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '../../../core/services/base.service';
import { Repository } from 'typeorm';

import { FieldDataType } from '../entities/field-datatype.entity';

@Injectable()
export class FieldDataTypeService extends BaseService<FieldDataType> {
  constructor(
    @InjectRepository(FieldDataType)
    fieldDataTypeRepository: Repository<FieldDataType>,
  ) {
    super(fieldDataTypeRepository, FieldDataType);
  }
}
