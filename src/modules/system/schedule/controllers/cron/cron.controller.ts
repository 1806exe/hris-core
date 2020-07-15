import { Controller } from '@nestjs/common';
import { MaintenanceBaseController } from '../../../../../core/maintenance/controllers/base.controller';
import { Cron } from '../../entities/cron.entity';
import { CronService } from '../../services/cron/cron.service';

@Controller('api/' + Cron.plural)
export class CronController extends MaintenanceBaseController<Cron> {
    constructor(cronService: CronService) {
        super(cronService, Cron);
    }
}
