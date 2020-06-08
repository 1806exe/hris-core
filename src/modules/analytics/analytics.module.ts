import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnalyticsController } from './controllers/analytics.controller';
import { AnalyticsService } from './services/analytics.service';
import { TaskModule } from '../system/task/task.module';
import { TrainingAnalyticsService } from './services/training.analytics.service';


@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'basic', session: true }),
    TaskModule
  ],
  controllers: [AnalyticsController],
  providers: [AnalyticsService, TrainingAnalyticsService],
})
export class AnalyticsModule {}
