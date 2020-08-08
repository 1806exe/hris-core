import { Controller } from '@nestjs/common';
import { BaseController } from '../../../core/controllers/base.contoller';

import { TrainingSponsorService } from '../services/training-sponsor.service';
import { TrainingSponsor } from '../entities/training-sponsor.entity';
import { MaintenanceBaseController } from 'src/core/maintenance/controllers/base.controller';

@Controller('api/training/' + TrainingSponsor.plural)
export class TrainingSponsorController extends MaintenanceBaseController<
  TrainingSponsor
> {
  constructor(trainingSponsorService: TrainingSponsorService) {
    super(trainingSponsorService, TrainingSponsor);
  }
}
