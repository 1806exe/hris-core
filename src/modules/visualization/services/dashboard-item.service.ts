import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/core/services/base.service';
import { Repository } from 'typeorm';
import { DashboardItem } from '../entities/dashboard-item.entity';
import { MaintenanceBaseService } from 'src/core/maintenance/services/base.service';

@Injectable()
export class DashboardItemService extends MaintenanceBaseService<
  DashboardItem
> {
  constructor(
    @InjectRepository(DashboardItem)
    repository: Repository<DashboardItem>,
  ) {
    super(repository, DashboardItem);
  }
}
