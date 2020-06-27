import { Controller, Get, Res, Param, Query } from '@nestjs/common';
import { BaseController } from '../../../core/controllers/base.contoller';
import { DataStore } from '../../../modules/record/entities/data-store.entity';

import { DataStoreService } from '../services/data-store.service';

@Controller('api/' + DataStore.plural)
export class DataStoreController extends BaseController<DataStore> {
    constructor(private readonly dataStoreService: DataStoreService) {
        super(dataStoreService, DataStore);
    }
    @Get(':namespace')
    async getAll(@Param() params) {
        console.log('Params:', params);
        console.log('Find All:', await this.findAll({ fields:'uid', filter: 'key:eq:' + params.namespace}));
        const data = await this.findAll({ fields: 'uid', filter: 'key:eq:' + params.namespace });
        return {
            pager: data.pager,
            [params.namespace]: data.dataStore.map((d) => {
                return {
                    ...d.data,
                    id: d.uid
                }
            })
        }
    }
}
