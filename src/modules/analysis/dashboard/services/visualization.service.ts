import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '../../../visualization/services/node_modules/src/core/services/base.service';
import { Repository } from 'typeorm';

import { Dashboard } from '../entities/dashboard.entity';

@Injectable()
export class VisualizationService extends BaseService<Visualization> {
  constructor(
    @InjectRepository(Visualization)
    repository: Repository<Visualization>,
  ) {
    super(repository, Visualization);
  }
}
