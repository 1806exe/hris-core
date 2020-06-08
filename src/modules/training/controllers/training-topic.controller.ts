import { Controller } from '@nestjs/common';

import { TrainingTopicService } from '../services/training-topic.service';
import { TrainingTopic } from '../entities/training-topic.entity';
import { MaintenanceBaseController } from 'src/core/maintenance/controllers/base.contoller';

@Controller('api/training/' + TrainingTopic.plural)
export class TrainingTopicController extends MaintenanceBaseController<
TrainingTopic
> {
    constructor(trainingMethodService: TrainingTopicService) {
        super(trainingMethodService, TrainingTopic);
    }
}