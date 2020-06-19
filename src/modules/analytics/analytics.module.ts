import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { IndicatorModule } from '../indicator/indicator.module';
import { TaskModule } from '../system/task/task.module';
import { AnalyticsController } from './controllers/analytics.controller';
import { AnalyticsService } from './services/analytics.service';
import { TrainingAnalyticsService } from './services/training.analytics.service';
import { OrganisatinUnitModule } from '../organisation-unit/organisation-unit.module';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'basic', session: true }),
    IndicatorModule,
    OrganisatinUnitModule,
    TaskModule,
  ],
  controllers: [AnalyticsController],
  providers: [AnalyticsService, TrainingAnalyticsService],
})
export class AnalyticsModule {}
