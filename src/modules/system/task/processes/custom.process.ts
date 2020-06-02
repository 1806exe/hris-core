import { Task } from '../entities/task.entity';
import { BackgroundProcess } from './base.process';
import { Connection } from 'typeorm';
import {
  format,
  endOfMonth,
  startOfMonth,
  getDaysInMonth,
  endOfQuarter,
  startOfQuarter,
  differenceInDays,
  getDaysInYear,
  startOfYear,
  endOfWeek,
  startOfWeek,
  endOfYear,
} from 'date-fns';
import { Injectable } from '@nestjs/common';
import { TaskService } from '../services/task.service';
import { Process } from '../../schedule/entities/process.entity';
import { ProcessService } from '../../schedule/services/process.service';
import Axios from 'axios';

@Injectable()
export class CustomProcess extends BackgroundProcess {
  constructor(protected taskService: TaskService,private process:Process,
    private connetion: Connection, private parameters:{[x:string]:any}){
    super(taskService);
  }
  async run() {
    const execute = Function('context', this.process.code);
    await execute({
      parameters: this.parameters,
      log:(logDetails)=>{
        this.log(logDetails)
      },
      http: Axios,
      db: this.connetion,
    });
  }
  async getProcessName():Promise<string>{
    return 'Custom Process '+ this.process.name;
  }
}
