import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/core/services/base.service';
import { Repository } from 'typeorm';
import { TrainingCurriculum } from '../entities/training-curriculum.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MaintenanceBaseService } from 'src/core/maintenance/services/base.service';

@Injectable()
export class TrainingCurriculumService extends MaintenanceBaseService<TrainingCurriculum> {
    constructor(
        @InjectRepository(TrainingCurriculum)
        trainingCurriculumRepository: Repository<TrainingCurriculum>,
    ) {
        super(trainingCurriculumRepository, TrainingCurriculum);
    }
}