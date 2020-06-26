import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { BaseService } from '../../../../core/services/base.service';
import { Repository, Connection } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Schedule } from '../entities/schedule.entity';
import { SchedulerRegistry, Cron } from '@nestjs/schedule';
import { CronJob } from 'cron';
import { AnalyticsGenerator } from '../../task/processes/analytics.process';
import { TaskService } from '../../task/services/task.service';
import { PeriodGenerator } from '../../task/processes/period-generator.process';
import { OrgUnitGenerator } from '../../task/processes/orgunit-generator.process';
import { Process } from '../entities/process.entity';
import { CustomProcess } from '../../task/processes/custom.process';

@Injectable()
export class ScheduleService extends BaseService<Schedule>  implements OnModuleInit{
  constructor(
    @InjectRepository(Schedule)
    scheduleRepository: Repository<Schedule>,
    private readonly schedulerRegistry: SchedulerRegistry,
    private taskService: TaskService,private connetion:Connection
  ) {
    super(scheduleRepository, Schedule);
  }
  async onModuleInit(): Promise<void> {
    let schedules = await this.findAll();
    console.log('Schedules:',schedules);
    schedules.forEach((schedule)=>{
      this.addCronJob(schedule);
    })
  }
  async getProcess() {
    return this.findOneByUid;
  }
  @Cron('* * * * *', {
    name: 'dhis 2 hrhis sync',
  })
  triggerNotifications() {
    const job = this.schedulerRegistry.getCronJob('dhis 2 hrhis sync');

    job.stop();
    console.log(job.lastDate());
  }
  addCronJob(schedule:Schedule) {
    const job = new CronJob(`${schedule.cron}`, async () => {
      Logger.warn(`time (${schedule.cron}) for job ${schedule.name} to run!`);
      let task = await this.taskService.createEmptyTask(schedule.name);
      let process;
      if(schedule.type === 'ANALYTICS'){
        process = (new AnalyticsGenerator(this.taskService, this.connetion)).start(task);
      } else if(schedule.type === 'PERIODSTRUCTURE'){
        process = (new PeriodGenerator(this.taskService, this.connetion)).start(task);
      } else if(schedule.type === 'ORGUNITSTRUCTURE'){
        process = (new OrgUnitGenerator(this.taskService, this.connetion)).start(task);
      } else if(schedule.type === 'CUSTOMPROCESS'){
        //let process:Process = await this.processService.findOneByUid(schedule.process);
        process = (new CustomProcess(this.taskService, schedule.process, this.connetion, {})).start(task)
      }
      process.then(()=>{
        Logger.log(
          `${schedule.name} successfully done!`,
        );
      }).catch((error)=>{
        console.log('Error:', error);
        Logger.error(
          `${schedule.name} Failed!`,
        );
      })
    });

    this.schedulerRegistry.addCronJob(schedule.name, job);
    job.start();

    Logger.warn(
      `${schedule.name} will sync every ${schedule.cron} seconds!`,
    );
  }
}
