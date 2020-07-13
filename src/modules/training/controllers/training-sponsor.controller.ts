import { Controller } from '@nestjs/common';
import { BaseController } from '../../../core/controllers/base.contoller';

import { TrainingSponsorService } from '../services/training-sponsor.service';
import { TrainingSponsor } from '../entities/training-sponsor.entity';

@Controller('api/training/' + TrainingSponsor.plural)
export class TrainingSponsorController extends BaseController<
TrainingSponsor
> {
    constructor(trainingSponsorService: TrainingSponsorService) {
        super(trainingSponsorService, TrainingSponsor);
    }
}
