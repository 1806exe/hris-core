import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpErrorFilter } from './core/filters/http-error.filter';
import { LoggingInterceptor } from './core/interceptors/logging.interceptor';
import { getDataBaseConfiguration } from './core/utilities/configuration';
import { AnalyticsModule } from './modules/analytics/analytics.module';
import { AppsModule } from './modules/app/apps.module';
import { FormModule } from './modules/form/form.module';
import { IndicatorModule } from './modules/indicator/indicator.module';
import { MessageModule } from './modules/message/message.module';
import { OrganisatinUnitModule } from './modules/organisation-unit/organisation-unit.module';
import { RecordModule } from './modules/record/record.module';
import { ReportModule } from './modules/report/report.module';
import { SystemSettingModule } from './modules/system-setting/system-setting.module';
import { SchedulesModule } from './modules/system/schedule/schedule.module';
import { TaskModule } from './modules/system/task/task.module';
import { UserAuthorityModule } from './modules/system/user-authority/user-authority.module';
import { UserGroupModule } from './modules/system/user-group/user-group.module';
import { UserRoleModule } from './modules/system/user-role/user-role.module';
import { UserModule } from './modules/system/user/user.module';
import { TrainingModule } from './modules/training/training.module';
import { VisualizationModule } from './modules/visualization/visualization.module';
import { ScheduleModule } from '@nestjs/schedule';


@Module({
  imports: [
    AppsModule,
    Repository,
    TypeOrmModule.forRoot(getDataBaseConfiguration()),
    OrganisatinUnitModule,
    FormModule,
    UserModule,
    UserRoleModule,
    UserGroupModule,
    UserAuthorityModule,
    TaskModule,
    SchedulesModule,
    VisualizationModule,
    ReportModule,
    TrainingModule,
    MessageModule,
    RecordModule,
    IndicatorModule,
    AnalyticsModule,
    SystemSettingModule,
    ScheduleModule.forRoot()
  ],

  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_INTERCEPTOR, useClass: LoggingInterceptor },
    { provide: APP_FILTER, useClass: HttpErrorFilter },
  ],
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}
