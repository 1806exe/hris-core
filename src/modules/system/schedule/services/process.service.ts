import { Injectable } from '@nestjs/common';
import { BaseService } from '../../../../core/services/base.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Process } from '../entities/process.entity';
import { MaintenanceBaseService } from '../../../../core/maintenance/services/base.service';

@Injectable()
export class ProcessService extends MaintenanceBaseService<Process> {
  constructor(
    @InjectRepository(Process)
    processRepository: Repository<Process>,
  ) {
    super(processRepository, Process);
  }
}
