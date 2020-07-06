import { Module } from '@nestjs/common';
import { ScheduleController } from './controllers/schedule.controlles';
import { ScheduleService } from './services/schedule.service';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Schedule } from './entities/schedule.entity';
import { ProcessController } from './controllers/process.controller';
import { ProcessService } from './services/process.service';
import { Process } from './entities/process.entity';
import { TaskModule } from '../task/task.module';
import { Cron } from './entities/cron.entity';
import { CronController } from './controllers/cron/cron.controller';
import { CronService } from './services/cron/cron.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'basic', session: true }),
    TypeOrmModule.forFeature([Schedule, Process, Cron]),
    TaskModule,
    SchedulesModule
  ],
  controllers: [ScheduleController, ProcessController, CronController],
  providers: [ScheduleService, ProcessService, CronService],
  exports: [ProcessService],
})
export class SchedulesModule {}
