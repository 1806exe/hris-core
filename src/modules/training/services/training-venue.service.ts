import { Injectable } from '@nestjs/common';
import { BaseService } from '../../../core/services/base.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TrainingVenue } from '../entities/training-venue.entity';

@Injectable()
export class TrainingVenueService extends BaseService<TrainingVenue> {
    constructor(
        @InjectRepository(TrainingVenue)
        trainingVenueRepository: Repository<TrainingVenue>,
    ) {
        super(trainingVenueRepository, TrainingVenue);
    }
}