import {
  Controller,
  Post,
  UseGuards,
  Req,
  Res,
  Body,
  HttpStatus,
} from '@nestjs/common';

import { TrainingCurriculumService } from '../services/training-curriculum.service';
import { TrainingCurriculum } from '../entities/training-curriculum.entity';
import { MaintenanceBaseController } from '../../../core/maintenance/controllers/base.controller';
import { SessionGuard } from '../../system/user/guards/session.guard';
import { sanitizeResponseObject } from '../../../core/utilities/sanitize-response-object';

@Controller('api/training/' + TrainingCurriculum.plural)
export class TrainingCurriculumController extends MaintenanceBaseController<
  TrainingCurriculum
> {
  constructor(private trainingCurriculumService: TrainingCurriculumService) {
    super(trainingCurriculumService, TrainingCurriculum);
  }
  @Post()
  @UseGuards(SessionGuard)
  async createCurriculum(
    @Res() res,
    @Body() createCurriculumDTO,
  ): Promise<any> {
    try {
      const curriculum = await this.trainingCurriculumService.createCurriculum(
        createCurriculumDTO,
      );
      return res.status(HttpStatus.OK).send(sanitizeResponseObject(curriculum));
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}
