import { Module } from '@nestjs/common';
import { ReportController } from './controllers/report.controller';
import { ReportService } from './services/report.service';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Report } from './entities/report.entity';
import { ReportGroupController } from './controllers/reportgroup.controller';
import { ReportGroupService } from './services/reportgroup.service';
import { ReportGroup } from './entities/report.group.entity';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'basic', session: true }),
    TypeOrmModule.forFeature([Report, ReportGroup]),
  ],
  controllers: [ReportController, ReportGroupController],
  providers: [ReportService, ReportGroupService],
})
export class ReportModule {}
