import { Injectable } from '@nestjs/common';
import { Task } from '../entities/task.entity';
import { TaskService } from '../services/task.service';


@Injectable()
export class BackgroundProcess {
  protected task:Task
  constructor(protected taskService: TaskService) {}
  async start(task?:Task){
    this.task = task;
    try{
      await this.run();
      task.status = 'FINISHED';
      task.endedat = new Date();
      await this.taskService.update(this.task);
    }catch(e){
      console.error(e);
      task.status = 'ERROR';
      task.endedat = new Date();
      await this.log({type:"ERROR",message: e.message});
    }
  }
  async getProcessName():Promise<string>{
    throw('Run Not Implemented')
  }
  async run(){
      throw('Run Not Implemented')
  }
  async log(logdetails:{type:'ERROR'|'INFO'|'SUCCESS'|'WARNING',message:string,code?:number}){
    console.log(await this.getProcessName(),logdetails.type,":",logdetails.message);
    this.task.log.push({
      ...logdetails,
      timeStamp: (new Date()).toISOString(),
      context: (await this.getProcessName()).toUpperCase()
    });
    return await this.taskService.update(this.task);
  }
}
