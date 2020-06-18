import { Controller } from '@nestjs/common';
import { BaseController } from 'src/core/controllers/base.contoller';
import { Visualization } from '../entities/visualization.entity';
import { VisualizationService } from '../services/visualization.service';

@Controller('api/' + Visualization.plural)
export class VisualizationController extends BaseController<Visualization> {
  constructor(service: VisualizationService) {
    super(service, Visualization);
  }
}
