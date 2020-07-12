import { Controller, Post, UseGuards, Body } from '@nestjs/common';
import { BaseController } from '../../../core/controllers/base.contoller';

import { TrainingVenueService } from '../services/training-venue.service';
import { TrainingVenue } from '../entities/training-venue.entity';
import { SessionGuard } from '../../../modules/system/user/guards/session.guard';

@Controller('api/training/' + TrainingVenue.plural)
export class TrainingVenueController extends BaseController<TrainingVenue> {
  constructor(private trainingVenueService: TrainingVenueService) {
    super(trainingVenueService, TrainingVenue);
  }
  @Post()
  @UseGuards(SessionGuard)
  async createVenue(@Body() createVenueDTO) {
    return this.trainingVenueService.createVenue(createVenueDTO);
  }
}
