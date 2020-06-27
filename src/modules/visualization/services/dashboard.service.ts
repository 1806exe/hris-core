import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '../../../core/services/base.service';
import { Repository } from 'typeorm';

import { Dashboard } from '../entities/dashboard.entity';
import { MaintenanceBaseService } from 'src/core/maintenance/services/base.service';

@Injectable()
export class DashboardService extends MaintenanceBaseService<Dashboard> {
  constructor(
    @InjectRepository(Dashboard)
    repository: Repository<Dashboard>,
  ) {
    super(repository, Dashboard);
  }
}
