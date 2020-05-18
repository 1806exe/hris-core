import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/core/services/base.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TrainingSection } from '../entities/training-section.entity';
import { MaintenanceBaseService } from 'src/core/maintenance/services/base.service';

@Injectable()
export class TrainingSectionService extends MaintenanceBaseService<TrainingSection> {
    constructor(
        @InjectRepository(TrainingSection)
        trainingSectionRepository: Repository<TrainingSection>,
    ) {
        super(trainingSectionRepository, TrainingSection);
    }
}