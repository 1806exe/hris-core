import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { App } from './modules/app/entities/apps.entity';
import { BaseService } from './core/services/base.service';
import { AppsService } from './modules/app/services/apps.service';

@Injectable()
export class AppService{
    
    constructor(
        private appsService: AppsService
    ) {
    }

    async getLoginApp(): Promise<App> {
        let apps = await this.appsService.findWhere({name:Like("%Login%")});
        return apps[0];
    }
    async getDefaultLoginApp(): Promise<App> {
        let apps = await this.appsService.findWhere({name:Like("%Dashboard%")});
        return apps[0];
    }
}
