import {
  Controller,
  Get,
  UseGuards,
  Param,
  HttpStatus,
  Res,
  Query,
  Post,
  Delete,
  Body,
  Put,
  NotFoundException,
} from '@nestjs/common';
import { BaseController } from '../../../core/controllers/base.contoller';

import { TrainingSessionService } from '../services/training-session.service';
import { TrainingSession } from '../entities/training-session.entity';
import { SessionGuard } from '../../../modules/system/user/guards/session.guard';
import { sanitizeResponseObject } from '../../../core/utilities/sanitize-response-object';
import { SessionParticipant } from '../entities/training-session-participant.entity';
import { getPagerDetails } from '../../../core/utilities';
import * as _ from 'lodash';

@Controller('api/training/' + TrainingSession.plural)
export class TrainingSessionController extends BaseController<TrainingSession> {
  constructor(private trainingSessionService: TrainingSessionService) {
    super(trainingSessionService, TrainingSession);
  }

  @Post()
  @UseGuards(SessionGuard)
  async createSession(@Body() createSessionDTO: any, @Res() res) {
    const session = await this.trainingSessionService.createSession(
      createSessionDTO,
    );
    return res.status(HttpStatus.OK).send(sanitizeResponseObject(session));
  }
  @Get('/deliverymode')
  @UseGuards(SessionGuard)
  async delivery() {
    return this.trainingSessionService.deliverymode();
  }
  @Get(':session/participants')
  @UseGuards(SessionGuard)
  async getParticipants(@Param() param, @Res() res, @Query() query) {
    const sessions = await this.trainingSessionService.getParticipants(
      param.session,
    );
    return res.status(HttpStatus.OK).send(sanitizeResponseObject(sessions));
  }

  @Get(':session/facilitators')
  @UseGuards(SessionGuard)
  async getFacilitators(@Param() param, @Res() res) {
    const sessions = await this.trainingSessionService.getFacilitators(
      param.session,
    );
    return res.status(HttpStatus.OK).send(sanitizeResponseObject(sessions));
  }
  @Post(':session/participants')
  @UseGuards(SessionGuard)
  async addParticipants(
    @Param() param,
    @Res() res,
    @Query() query,
    @Body() createParticipantDto: any,
  ) {
    const sessions = await this.trainingSessionService.addParticipant(
      param.session,
      createParticipantDto,
    );
    return res.status(HttpStatus.OK).send(sanitizeResponseObject(sessions));
  }

  @Post(':session/facilitators')
  @UseGuards(SessionGuard)
  async addFacilitators(
    @Param() param,
    @Res() res,
    @Body() createFacilitatorDto: any,
  ) {
    const sessions = await this.trainingSessionService.addFacilitator(
      param.session,
      createFacilitatorDto,
    );
    return res.status(HttpStatus.OK).send(sanitizeResponseObject(sessions));
  }
  @Delete(':session/participants/:record')
  @UseGuards(SessionGuard)
  async deleteParticipants(@Param() param, @Res() res, @Query() query) {
    await this.trainingSessionService.deleteParticipant(
      param.session,
      param.record,
    );
    return res.status(HttpStatus.OK).send('Participant Deleted Successfully');
  }

  @Delete(':session/facilitators/:record')
  @UseGuards(SessionGuard)
  async deleteFacilitators(@Param() param, @Res() res) {
    await this.trainingSessionService.deleteFacilitator(
      param.session,
      param.record,
    );
    return res.status(HttpStatus.OK).send('Facilitator Deleted Successfully');
  }
  @Post(':session/topics')
  @UseGuards(SessionGuard)
  async saveTopics(@Param() Param, @Body() saveTopicsDTO: any, @Res() res) {
    await this.trainingSessionService.saveTopics(Param.session, saveTopicsDTO);
    return res.status(HttpStatus.OK).send('Topics Added Successfully');
  }
  @Put('participants/:participant')
  @UseGuards(SessionGuard)
  async updateParticipant(
    @Param() Param,
    @Body() updateParticipantDTO: any,
    @Res() res,
  ) {
    const sessionparticipant = await this.trainingSessionService.findOneParticipant(
      Param.participant,
    );
    if (sessionparticipant !== undefined) {
      const participant = await this.trainingSessionService.updateParticipant(
        Param.participant,
        updateParticipantDTO,
      );
      return res
        .status(HttpStatus.OK)
        .send(sanitizeResponseObject(participant));
    } else {
      throw new NotFoundException('Participant Not Available');
    }
  }
}
