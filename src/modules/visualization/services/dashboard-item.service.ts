import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '../../../core/services/base.service';
import { Repository } from 'typeorm';
import { DashboardItem } from '../entities/dashboard-item.entity';

@Injectable()
export class DashboardItemService extends BaseService<DashboardItem> {
  constructor(
    @InjectRepository(DashboardItem)
    repository: Repository<DashboardItem>,
  ) {
    super(repository, DashboardItem);
  }
}
