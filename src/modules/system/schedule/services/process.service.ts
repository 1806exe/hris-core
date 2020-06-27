import { Injectable } from '@nestjs/common';
import { BaseService } from '../../../../core/services/base.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Process } from '../entities/process.entity';

@Injectable()
export class ProcessService extends BaseService<Process>{
    constructor(@InjectRepository(Process)
    processRepository: Repository<Process>,
    ){
        super(processRepository, Process);
    }
}

