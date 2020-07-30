import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { AuthenticatedUser } from '../../../core/helpers/user-decorator.helper';
import { TaskService } from '../../system/task/services/task.service';
import { AnalyticsService } from '../services/analytics.service';
import { SessionGuard } from '../../system/user/guards/session.guard';
import { TrainingAnalyticsService } from '../services/training.analytics.service';
import { extractAnalytics } from '../../../core/utilities/analytics-query-extractor';

@Controller('api/analytics')
export class AnalyticsController {
  constructor(
    private analyticsService: AnalyticsService,
    private trainingAnalyticsService: TrainingAnalyticsService,
    private taskService: TaskService,
  ) {}
  @Get()
  @UseGuards(SessionGuard)
  async fetchAnalytics(@Query() query, @AuthenticatedUser() user) {
    let params = extractAnalytics(query);
    return this.analyticsService.fetchAnalytics(
      params.dx,
      params.pe,
      params.ou,
      {
        user,
      },
    );
  }
  @Get('records/:formid')
  async fetchRecordsAnalytics(
    @Param() params,
    @Query() query,
    @AuthenticatedUser() user,
  ) {
    console.log('query:', query);
    let pe;
    let ou;
    let otherDimensions = {};
    if (!query.dimension) {
      return {
        status: 'ERROR',
        message:
          'No dimension was provided. Please provide period(pe) and organisation unit(ou) dimension',
      };
    }
    if (!Array.isArray(query.dimension)) {
      console.log(query.dimension);
      query.dimension = [query.dimension];
    }
    if (query.pe && !Array.isArray(query.pe)) {
      pe = query.pe.split(';');
    }
    query.dimension.forEach((dimension) => {
      let split = dimension.split(':');
      if (split[0] === 'ou') {
        ou = split[1].split(';');
      } else {
        otherDimensions[split[0]] = split[1];
      }
    });
    console.log(otherDimensions);
    /*if (!pe || pe[0] === '') {
      return {
        status: 'ERROR',
        message: 'Period dimension not found',
      };
    }*/
    if (!ou || ou[0] === '') {
      return {
        status: 'ERROR',
        message: 'Organisation Unit dimension not found',
      };
    }
    return await this.analyticsService.getAnalyticsRecords(
      params.formid,
      ou,
      pe,
      otherDimensions,
    );
  }

  @Get('orgUnit/count')
  async fetchAnalyticsOrgUnitCount(
    @Param() params,
    @Query() query,
    @AuthenticatedUser() user,
  ) {
    console.log('query:', query);
    let pe;
    let ou;
    let otherDimensions = {};
    if (!query.dimension) {
      return {
        status: 'ERROR',
        message:
          'No dimension was provided. Please provide period(pe) and organisation unit(ou) dimension',
      };
    }
    if (!Array.isArray(query.dimension)) {
      console.log(query.dimension);
      query.dimension = [query.dimension];
    }
    if (query.pe && !Array.isArray(query.pe)) {
      pe = query.pe.split(';');
    }
    query.dimension.forEach((dimension) => {
      let split = dimension.split(':');
      if (split[0] === 'ou') {
        ou = split[1].split(';');
      } else {
        otherDimensions[split[0]] = split[1];
      }
    });
    console.log('helloooo :: ', otherDimensions);
    /*if (!pe || pe[0] === '') {
      return {
        status: 'ERROR',
        message: 'Period dimension not found',
      };
    }*/
    if (!ou || ou[0] === '') {
      return {
        status: 'ERROR',
        message: 'Organisation Unit dimension not found',
      };
    }
    return await this.analyticsService.getAnalyticsOrgUnitCount(
      ou,
      pe,
      otherDimensions,
      {
        user: user,
      },
    );
  }

  @Get('training/providers/:formid')
  async fetchTrainingAnalytics(
    @Param() params,
    @Query() query,
    @AuthenticatedUser() user,
  ) {
    if (!query.dimension) {
      return {
        status: 'ERROR',
        message:
          'No dimension was provided. Please provide period(pe) and organisation unit(ou) dimension',
      };
    }
    console.log('Here');
    if (!Array.isArray(query.dimension)) {
      console.log(query.dimension);
      query.dimension = [query.dimension];
    }
    let analyticsDimensions = extractAnalytics(query);
    if (!analyticsDimensions.ou || analyticsDimensions.ou[0] === '') {
      return {
        status: 'ERROR',
        message: 'Organisation Unit dimension not found',
      };
    }
    return await this.trainingAnalyticsService.getTrainingAnalyticsRecords(
      params.formid,
      analyticsDimensions
    );
  }

  @Get('training/coverage')
  async fetchTrainingCoverageAnalytics(
    @Param() params,
    @Query() query,
    @AuthenticatedUser() user,
  ) {
    console.log('query:', query);
    let pe;
    let ou;
    let otherDimensions = {};
    if (!query.dimension) {
      return {
        status: 'ERROR',
        message:
          'No dimension was provided. Please provide period(pe) and organisation unit(ou) dimension',
      };
    }
    if (!Array.isArray(query.dimension)) {
      console.log(query.dimension);
      query.dimension = [query.dimension];
    }
    if (!Array.isArray(query.pe)) {
      pe = query.pe.split(';');
    }
    query.dimension.forEach((dimension) => {
      let split = dimension.split(':');
      if (split[0] === 'ou') {
        ou = split[1].split(';');
      } else {
        otherDimensions[split[0]] = split[1] + ':' + split[2];
      }
    });
    console.log(otherDimensions);
    if (!pe || pe[0] === '') {
      return {
        status: 'ERROR',
        message: 'Period dimension not found',
      };
    }
    if (!ou || ou[0] === '') {
      return {
        status: 'ERROR',
        message: 'Organisation Unit dimension not found',
      };
    }
    let filter = {};
    if (query.filter) {
      if (!Array.isArray(query.filter)) {
        let split = query.filter.split(':');
        filter[split[0]] = split[1] + ':' + split[2];
      } else {
        query.filter.forEach((fil) => {
          let split = fil.split(':');
          filter[split[0]] = split[1] + ':' + split[2];
        });
      }
    }
    return await this.trainingAnalyticsService.getTrainingCoverageRecords(
      ou,
      pe,
      otherDimensions,
      {
        user: user,
      },
    );
  }

  @Get('training/sessions')
  async fetchTrainingSessions(
    @Param() params,
    @Query() query,
    @AuthenticatedUser() user,
  ) {
    console.log('query:', query);
    let pe;
    let ou;
    let otherDimensions = {};
    if (!query.dimension) {
      return {
        status: 'ERROR',
        message:
          'No dimension was provided. Please provide period(pe) and organisation unit(ou) dimension',
      };
    }
    if (!Array.isArray(query.dimension)) {
      console.log(query.dimension);
      query.dimension = [query.dimension];
    }
    if (!Array.isArray(query.pe)) {
      pe = query.pe.split(';');
    }
    query.dimension.forEach((dimension) => {
      let split = dimension.split(':');
      if (split[0] === 'ou') {
        ou = split[1].split(';');
      } else {
        otherDimensions[split[0]] = split[1] + ':' + split[2];
      }
    });
    console.log(otherDimensions);
    if (!pe || pe[0] === '') {
      return {
        status: 'ERROR',
        message: 'Period dimension not found',
      };
    }
    if (!ou || ou[0] === '') {
      return {
        status: 'ERROR',
        message: 'Organisation Unit dimension not found',
      };
    }
    let filter = {};
    if (query.filter) {
      if (!Array.isArray(query.filter)) {
        let split = query.filter.split(':');
        filter[split[0]] = split[1] + ':' + split[2];
      } else {
        query.filter.forEach((fil) => {
          let split = fil.split(':');
          filter[split[0]] = split[1] + ':' + split[2];
        });
      }
    }
    return await this.trainingAnalyticsService.getTrainingSessions(
      ou,
      pe,
      otherDimensions,
      {
        user: user,
      },
    );
  }
}
