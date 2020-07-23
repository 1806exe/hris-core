import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BaseService } from '../../../core/services/base.service';
import { DataStore } from '../entities/data-store.entity';

@Injectable()
export class DataStoreService extends BaseService<DataStore> {
  constructor(
    @InjectRepository(DataStore)
    dataStoreRepository: Repository<DataStore>,
  ) {
    super(dataStoreRepository, DataStore);
  }
}
