import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MaintenanceBaseService } from '../../../core/maintenance/services/base.service';
import { Repository } from 'typeorm';
import { Visualization } from '../entities/visualization.entity';

@Injectable()
export class VisualizationService extends MaintenanceBaseService<
  Visualization
> {
  constructor(
    @InjectRepository(Visualization)
    repository: Repository<Visualization>,
  ) {
    super(repository, Visualization);
  }
}
