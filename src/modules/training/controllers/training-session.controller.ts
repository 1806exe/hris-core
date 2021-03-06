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
import { SessionGuard } from '../../system/user/guards/session.guard';
import { sanitizeResponseObject } from '../../../core/utilities/sanitize-response-object';
import { SessionParticipant } from '../entities/training-session-participant.entity';
import { getPagerDetails } from '../../../core/utilities';
import * as _ from 'lodash';
import { getSuccessResponse } from '../../../core/helpers/response.helper';

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
    const deletedparticipant = await this.trainingSessionService.deleteParticipant(
      param.session,
      param.record,
    );
    return res
      .status(HttpStatus.OK)
      .send(sanitizeResponseObject(deletedparticipant));
  }

  @Delete(':session/facilitators/:record')
  @UseGuards(SessionGuard)
  async deleteFacilitators(@Param() param, @Res() res) {
    const deletedfacilitator = await this.trainingSessionService.deleteFacilitator(
      param.session,
      param.record,
    );
    return res
      .status(HttpStatus.OK)
      .send(sanitizeResponseObject(deletedfacilitator));
  }
  @Post(':session/sharing')
  @UseGuards(SessionGuard)
  async sessionSharing(
    @Param() Param,
    @Body() sessionSharingDTO: any,
    @Res() res,
  ) {
    try {
      const session = await this.trainingSessionService.findOneByUid(
        Param.session,
      );
      const { user } = sessionSharingDTO;
      const sessionaccess = await this.trainingSessionService.SharedUser(user);

      if (session && sessionaccess === undefined) {
        const sharedsession = await this.trainingSessionService.sessionSharingCreation(
          Param.session,
          sessionSharingDTO,
        );
        return res
          .status(HttpStatus.CREATED)
          .send(sanitizeResponseObject(sharedsession));
      }
      if (session && sessionaccess !== undefined) {
        const sharedsession = await this.trainingSessionService.sessionSharingEdit(
          Param.session,
          sessionSharingDTO,
        );
        return res
          .status(HttpStatus.CREATED)
          .send(sanitizeResponseObject(sharedsession));
      }
    } catch (e) {
      return e;
    }
  }
  @Put(':session/participants/:record')
  @UseGuards(SessionGuard)
  async certifyParticipant(
    @Body() updateparticipantDTO,
    @Param() param,
    @Res() res,
  ) {
    const record = await this.trainingSessionService.findOneParticipant(
      param.record,
    );
    if (record !== undefined) {
      try {
        const participation = await this.trainingSessionService.updateParticipants(
          param.session,
          param.record,
          updateparticipantDTO,
        );
        return res
          .status(HttpStatus.OK)
          .send(sanitizeResponseObject(participation));
      } catch (e) {
        return e;
      }
    } else {
      throw new NotFoundException('Record doesnot exist');
    }
  }

  @Put(':session')
  @UseGuards(SessionGuard)
  async editSession(@Param() params, @Body() updatesessionDT: any, @Res() res) {
    const session = await this.trainingSessionService.findOneByUid(
      params.session,
    );
    console.log(session);
    if (session) {
      const editedsession = await this.trainingSessionService.editSession(
        params.session,
        updatesessionDT,
      );

      return res
        .status(HttpStatus.OK)
        .send(sanitizeResponseObject(editedsession));
    }
  }
}
