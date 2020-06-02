import { Controller } from '@nestjs/common';

import { TrainingCurriculumService } from '../services/training-curriculum.service';
import { TrainingCurriculum } from '../entities/training-curriculum.entity';
import { MaintenanceBaseController } from 'src/core/maintenance/controllers/base.contoller';

@Controller('api/training/' + TrainingCurriculum.plural)
export class TrainingCurriculumController extends MaintenanceBaseController<
TrainingCurriculum
> {
    constructor(trainingCurriculumService: TrainingCurriculumService) {
        super(trainingCurriculumService, TrainingCurriculum);
    }
}
