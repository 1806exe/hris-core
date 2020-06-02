import { Controller, Get, UseGuards, Res, Param, Logger, Query } from '@nestjs/common';
import { BaseController } from 'src/core/controllers/base.contoller';
import { Process } from '../entities/process.entity';
import { ProcessService } from '../services/process.service';
import { SessionGuard } from '../../user/guards/session.guard';
import { CustomProcess } from '../../task/processes/custom.process';
import { TaskService } from '../../task/services/task.service';
import { ApiResult } from 'src/core/interfaces';
import { Connection } from 'typeorm';

@Controller('api/' + Process.plural)
export class ProcessController extends BaseController<Process> {
  constructor(
    private processService: ProcessService,
    private taskService: TaskService,
    private connetion: Connection
  ) {
    super(processService, Process);
  }

  /*
   *
   * @params
   *
   *
   */
  @Get(':id/run')
  @UseGuards(SessionGuard)
  async run(@Param() params, @Query() query): Promise<ApiResult> {
    let process: Process = await this.processService.findOneByUid(params.id);
    let task = await this.taskService.createEmptyTask(process.name);
    new CustomProcess(this.taskService, process, this.connetion, query).start(task);
    return task;
  }

  @Get(':id/runSync')
  @UseGuards(SessionGuard)
  async runSync(@Param() params, @Query() query): Promise<ApiResult> {
    let process: Process = await this.processService.findOneByUid(params.id);
    let task = await this.taskService.createEmptyTask(process.name);
    await (new CustomProcess(this.taskService, process, this.connetion, query)).start(task);
    return task;
  }
}
