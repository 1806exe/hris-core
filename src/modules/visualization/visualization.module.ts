import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DashboardItemController } from './controllers/dashboard-item.controller';
import { DashboardController } from './controllers/dashboard.controller';
import { VisualizationController } from './controllers/visualization.controller';
import { DashboardItem } from './entities/dashboard-item.entity';
import { Dashboard } from './entities/dashboard.entity';
import { Visualization } from './entities/visualization.entity';
import { DashboardItemService } from './services/dashboard-item.service';
import { DashboardService } from './services/dashboard.service';
import { VisualizationService } from './services/visualization.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'basic', session: true }),
    TypeOrmModule.forFeature([Dashboard, DashboardItem, Visualization]),
    VisualizationModule,
  ],
  controllers: [
    DashboardController,
    DashboardItemController,
    VisualizationController,
  ],
  providers: [DashboardService, DashboardItemService, VisualizationService],
})
export class VisualizationModule {}
