import { Controller } from '@nestjs/common';
import { MaintenanceBaseController } from '../../../core/maintenance/controllers/base.controller';
import { Visualization } from '../entities/visualization.entity';
import { VisualizationService } from '../services/visualization.service';

@Controller('api/' + Visualization.plural)
export class VisualizationController extends MaintenanceBaseController<
  Visualization
> {
  constructor(service: VisualizationService) {
    super(service, Visualization);
  }
}
