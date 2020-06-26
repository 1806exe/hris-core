import { Controller } from '@nestjs/common';

import { TrainingTopicService } from '../services/training-topic.service';
import { TrainingTopic } from '../entities/training-topic.entity';
import { MaintenanceBaseController } from '../../../core/maintenance/controllers/base.controller';

@Controller('api/training/' + TrainingTopic.plural)
export class TrainingTopicController extends MaintenanceBaseController<
  TrainingTopic
> {
  constructor(trainingMethodService: TrainingTopicService) {
    super(trainingMethodService, TrainingTopic);
  }
}
