import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SchedulerRegistry, Cron } from '@nestjs/schedule';
import { Repository, Connection } from 'typeorm';

import { Schedule } from '../entities/schedule.entity';
import { CronJob } from 'cron';
import { AnalyticsGenerator } from '../../task/processes/analytics.process';
import { TaskService } from '../../task/services/task.service';
import { PeriodGenerator } from '../../task/processes/period-generator.process';
import { OrgUnitGenerator } from '../../task/processes/orgunit-generator.process';
import { CustomProcess } from '../../task/processes/custom.process';
import { MaintenanceBaseService } from '../../../../core/maintenance/services/base.service';

@Injectable()
export class ScheduleService extends MaintenanceBaseService<Schedule>
  implements OnModuleInit {
  constructor(
    @InjectRepository(Schedule)
    scheduleRepository: Repository<Schedule>,
    private readonly schedulerRegistry: SchedulerRegistry,
    private taskService: TaskService,
    private connetion: Connection,
  ) {
    super(scheduleRepository, Schedule);
  }
  async onModuleInit(): Promise<void> {
    const schedules = await this.findAll();
    if (schedules) {
      for (const schedule of await schedules) {
        this.addCronJob(schedule);
        Logger.debug(
          `[HRIS Custom Schedule] Current running schedule <${schedule?.name}>`,
        );
      }
    }
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
    Logger.verbose(`[HRIS Custom Schedule] Last JOB Date <${job.lastDate()}>`);
  }
  addCronJob(schedule: Schedule) {
    const job = new CronJob(`${schedule.cron}`, async () => {
      Logger.warn(
        `[HRIS Custom Schedule] Time <(${schedule.cron})> for JOB <${schedule.name}> to run!`,
      );
      const task = await this.taskService.createEmptyTask(schedule.name);
      let process;
      if (schedule.type === 'ANALYTICS') {
        process = new AnalyticsGenerator(
          this.taskService,
          this.connetion,
        ).start(task);
      } else if (schedule.type === 'PERIODSTRUCTURE') {
        process = new PeriodGenerator(this.taskService, this.connetion).start(
          task,
        );
      } else if (schedule.type === 'ORGUNITSTRUCTURE') {
        process = new OrgUnitGenerator(this.taskService, this.connetion).start(
          task,
        );
      } else if (schedule.type === 'CUSTOMPROCESS') {
        // let process:Process = await this.processService.findOneByUid(schedule.process);
        process = new CustomProcess(
          this.taskService,
          schedule.process,
          this.connetion,
          {},
        ).start(task);
      }
      process
        .then(() => {
          Logger.log(
            `[HRIS Custom Schedule] <${schedule.name}> successfully done!`,
          );
        })
        .catch((error) => {
          Logger.error(`[HRIS Custom Schedule] Error <${error}> Failed!`);
          Logger.error(`[HRIS Custom Schedule] <${schedule.name}> Failed!`);
        });
    });

    this.schedulerRegistry.addCronJob(schedule.name, job);
    job.start();
    Logger.verbose(
      `[HRIS Custom Schedule] <${schedule.name}> will sync every ${schedule.cron} seconds!`,
    );
  }
}
