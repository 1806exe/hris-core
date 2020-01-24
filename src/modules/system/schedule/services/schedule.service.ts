import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/core/services/base.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Schedule } from '../entities/schedule.entity';

@Injectable()
export class ScheduleService extends BaseService<Schedule>{
    constructor(@InjectRepository(Schedule)
    scheduleRepository: Repository<Schedule>,
    ){
        super(scheduleRepository, Schedule);
    }

    async getProcess(){
        return this.findOneByUid
    }
}

