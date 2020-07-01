import { Injectable } from '@nestjs/common';
import { BaseService } from '../../../core/services/base.service';
import { Repository } from 'typeorm';
import { TrainingCurriculum } from '../entities/training-curriculum.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MaintenanceBaseService } from '../../../core/maintenance/services/base.service';

@Injectable()
export class TrainingCurriculumService extends MaintenanceBaseService<TrainingCurriculum> {
    constructor(
        @InjectRepository(TrainingCurriculum)
        trainingCurriculumRepository: Repository<TrainingCurriculum>,
    ) {
        super(trainingCurriculumRepository, TrainingCurriculum);
    }
}