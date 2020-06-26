import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '../../../core/services/base.service';
import { Repository } from 'typeorm';
import { TrainingVenue } from '../entities/training-venue.entity';
import { Training } from '../entities/training.entity';

@Injectable()
export class TrainingService extends BaseService<Training> {
  constructor(
    @InjectRepository(Training)
    trainingRepository: Repository<Training>,
  ) {
    super(trainingRepository, Training);
  }
}
