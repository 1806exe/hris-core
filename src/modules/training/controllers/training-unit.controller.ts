import { Controller } from '@nestjs/common';
import { BaseController } from '../../../core/controllers/base.contoller';

import { TrainingUnitService } from '../services/training-unit.service';
import { TrainingUnit } from '../entities/training-unit.entity';
import { MaintenanceBaseController } from 'src/core/maintenance/controllers/base.contoller';

@Controller('api/training/' + TrainingUnit.plural)
export class TrainingUnitController extends MaintenanceBaseController<
TrainingUnit
> {
    constructor(trainingUnitService: TrainingUnitService) {
        super(trainingUnitService, TrainingUnit);
    }
}
