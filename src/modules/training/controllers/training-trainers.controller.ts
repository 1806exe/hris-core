import { Controller } from '@nestjs/common';
import { BaseController } from '../../../core/controllers/base.contoller';

import { TrainingTrainerService } from '../services/training-trainers.service';
import { TrainingTrainer } from '../entities/training-trainer.entity';

@Controller('api/training/' + TrainingTrainer.plural)
export class TrainingTrainerController extends BaseController<TrainingTrainer> {
  constructor(trainingTrainerService: TrainingTrainerService) {
    super(trainingTrainerService, TrainingTrainer);
  }
}
