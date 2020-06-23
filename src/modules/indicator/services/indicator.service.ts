import { Injectable } from '@nestjs/common';
import { Indicator } from '../entities/indicator.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/core/services/base.service';

@Injectable()
export class IndicatorService extends BaseService<Indicator> {
  constructor(
    @InjectRepository(Indicator)
    repository: Repository<Indicator>,
  ) {
    super(repository, Indicator);
  }
}
