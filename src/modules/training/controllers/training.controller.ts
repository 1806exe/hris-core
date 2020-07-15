import { Controller } from '@nestjs/common';
import { BaseController } from '../../../core/controllers/base.contoller';
import { Training } from '../entities/training.entity';
import { TrainingService } from '../services/training.service';

@Controller('api/training/' + Training.plural)
export class TrainingController extends BaseController<Training> {
  constructor(trainingService: TrainingService) {
    super(trainingService, Training);
  }
}
