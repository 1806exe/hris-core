import { Injectable } from '@nestjs/common';
import { BaseService } from '../../../core/services/base.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TrainingTopic } from '../entities/training-topic.entity';
import { MaintenanceBaseService } from '../../../core/maintenance/services/base.service';

@Injectable()
export class TrainingTopicService extends MaintenanceBaseService<
  TrainingTopic
> {
  constructor(
    @InjectRepository(TrainingTopic)
    trainingMethodRepository: Repository<TrainingTopic>,
  ) {
    super(trainingMethodRepository, TrainingTopic);
  }
}
