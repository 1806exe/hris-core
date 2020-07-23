import {
  Controller,
  Post,
  UseGuards,
  Body,
  Put,
  Param,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { BaseController } from '../../../core/controllers/base.contoller';

import { TrainingVenueService } from '../services/training-venue.service';
import { TrainingVenue } from '../entities/training-venue.entity';
import { SessionGuard } from '../../../modules/system/user/guards/session.guard';
import { throwError } from 'rxjs';
import { getSuccessResponse } from '../../../core/helpers/response.helper';
import { sanitizeResponseObject } from '../../../core/utilities/sanitize-response-object';

@Controller('api/training/' + TrainingVenue.plural)
export class TrainingVenueController extends BaseController<TrainingVenue> {
  constructor(private trainingVenueService: TrainingVenueService) {
    super(trainingVenueService, TrainingVenue);
  }
  @Post()
  @UseGuards(SessionGuard)
  async createVenue(@Body() createVenueDTO, @Res() res) {
    const venue = await this.trainingVenueService.createVenue(createVenueDTO);
    return res.status(HttpStatus.OK).send(sanitizeResponseObject(venue));
  }
  @Put(':venue')
  @UseGuards(SessionGuard)
  async updateVenue(@Body() updateVenueDTO, @Param() param, @Res() res) {
    const venue = await this.trainingVenueService.findOneByUid(param.venue);
    console.log(venue);
    if (venue !== undefined) {
      return await this.trainingVenueService.updateVenue(
        param.venue,
        updateVenueDTO,
      );
    } else throwError('Venue Not Available');
  }
}
