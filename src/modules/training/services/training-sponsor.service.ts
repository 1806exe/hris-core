import { Injectable } from '@nestjs/common';
import { BaseService } from '../../../core/services/base.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TrainingSponsor } from '../entities/training-sponsor.entity';
import { MaintenanceBaseService } from 'src/core/maintenance/services/base.service';

@Injectable()
export class TrainingSponsorService extends MaintenanceBaseService<
  TrainingSponsor
> {
  constructor(
    @InjectRepository(TrainingSponsor)
    trainingSponsorRepository: Repository<TrainingSponsor>,
  ) {
    super(trainingSponsorRepository, TrainingSponsor);
  }
}
