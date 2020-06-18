import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '../../../visualization/services/node_modules/src/core/services/base.service';
import { Repository } from 'typeorm';

import { Dashboard } from '../entities/dashboard.entity';

@Injectable()
export class DashboardService extends BaseService<Dashboard> {
  constructor(
    @InjectRepository(Dashboard)
    repository: Repository<Dashboard>,
  ) {
    super(repository, Dashboard);
  }
}
