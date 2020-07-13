import { Injectable, Logger } from '@nestjs/common';
import { Task } from '../entities/task.entity';
import { TaskService } from '../services/task.service';

@Injectable()
export class BackgroundProcess {
  protected task: Task;
  constructor(protected taskService: TaskService) {}
  async start(task?: Task) {
    this.task = task;
    try {
      await this.run();
      task.status = 'FINISHED';
      task.endedat = new Date();
      await this.taskService.update(this.task);
    } catch (e) {
      Logger.error(`[HRIS Custom Schedule] ${e}`);
      task.status = 'ERROR';
      task.endedat = new Date();
      await this.log({ type: 'ERROR', message: e.message });
    }
  }
  async getProcessName(): Promise<string> {
    throw new Error('Run Not Implemented');
  }
  async run() {
    throw new Error('Run Not Implemented');
  }
  async log(logdetails: {
    type: 'ERROR' | 'INFO' | 'SUCCESS' | 'WARNING';
    message: string;
    code?: number;
  }) {
    Logger.log(
      `[HRIS Custom Schedule] PROCESS: ${await this.getProcessName()} - TYPE: ${
        logdetails.type
      } - MESSAGE: ${logdetails.message} `,
    );
    this.task.log.push({
      ...logdetails,
      timeStamp: new Date().toISOString(),
      context: (await this.getProcessName()).toUpperCase(),
    });
    return await this.taskService.update(this.task);
  }
}
