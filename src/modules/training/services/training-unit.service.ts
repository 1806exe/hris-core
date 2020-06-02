import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/core/services/base.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TrainingUnit } from '../entities/training-unit.entity';
import { MaintenanceBaseService } from 'src/core/maintenance/services/base.service';

@Injectable()
export class TrainingUnitService extends MaintenanceBaseService<TrainingUnit> {
    constructor(
        @InjectRepository(TrainingUnit)
        trainingUnitRepository: Repository<TrainingUnit>,
    ) {
        super(trainingUnitRepository, TrainingUnit);
    }
}