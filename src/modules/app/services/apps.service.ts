import { BaseService } from '../../../core/services/base.service';
import { App } from '../entities/apps.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppsService extends BaseService<App> {
    constructor(
        @InjectRepository(App)
        public appsRepository: Repository<App>,
    ) {
        super(appsRepository, App);
    }

    async getLoginApp(): Promise<App> {
        return await this.appsRepository.findOne();
    }
}
