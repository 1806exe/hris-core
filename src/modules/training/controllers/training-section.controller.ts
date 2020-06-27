import { Controller } from '@nestjs/common';
import { BaseController } from '../../../core/controllers/base.contoller';

import { TrainingSectionService } from '../services/training-section.service';
import { TrainingSection } from '../entities/training-section.entity';
import { MaintenanceBaseController } from '../../../core/maintenance/controllers/base.controller';

@Controller('api/training/' + TrainingSection.plural)
export class TrainingSectionController extends MaintenanceBaseController<
  TrainingSection
> {
  constructor(trainingSectionService: TrainingSectionService) {
    super(trainingSectionService, TrainingSection);
  }
}
