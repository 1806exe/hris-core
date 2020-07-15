import { Controller, Post, UseGuards, Body, Put, Param, Res } from '@nestjs/common';
import { BaseController } from '../../../core/controllers/base.contoller';

import { TrainingVenueService } from '../services/training-venue.service';
import { TrainingVenue } from '../entities/training-venue.entity';
import { SessionGuard } from '../../../modules/system/user/guards/session.guard';
import { throwError } from 'rxjs';

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
  @Put(':venue')
  @UseGuards(SessionGuard)
  async updateVenue(@Body() updateVenueDTO, @Param() param, @Res() res ){
    const venue = await this.trainingVenueService.findOneByUid(param.venue);
    console.log(venue);
    if (venue !== undefined) {
      return await this.trainingVenueService.updateVenue(
        param.venue,
        updateVenueDTO,
      );
    }
    else(throwError('Venue Not Available'))
  }
}
