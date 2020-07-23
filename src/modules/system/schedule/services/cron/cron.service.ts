import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cron } from '../../entities/cron.entity';
import { MaintenanceBaseService } from '../../../../../core/maintenance/services/base.service';

@Injectable()
export class CronService extends MaintenanceBaseService<Cron> {
  constructor(
    @InjectRepository(Cron)
    cronRepository: Repository<Cron>,
  ) {
    super(cronRepository, Cron);
  }
}
