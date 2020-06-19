import { Controller } from '@nestjs/common';
import { Indicator } from '../entities/indicator.entity';
import { BaseController } from 'src/core/controllers/base.contoller';
import { IndicatorService } from '../services/indicator.service';

@Controller('api/' + Indicator.plural)
export class IndicatorController extends BaseController<Indicator> {
  constructor(service: IndicatorService) {
    super(service, Indicator);
  }
}
