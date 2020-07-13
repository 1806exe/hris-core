import { Injectable } from '@nestjs/common';
import { BaseService } from '../../../core/services/base.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TrainingTrainer } from '../entities/training-trainer.entity';

@Injectable()
export class TrainingTrainerService extends BaseService<TrainingTrainer> {
    constructor(
        @InjectRepository(TrainingTrainer)
        trainingTrainerRepository: Repository<TrainingTrainer>,
    ) {
        super(trainingTrainerRepository, TrainingTrainer);
    }
}