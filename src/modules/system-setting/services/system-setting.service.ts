import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { SystemSetting } from '../entities/system-setting.entity';
import { arrayToObject } from '../../../core/helpers/array-to-object.helper';

@Injectable()
export class SystemSettingService {
  constructor(
    @InjectRepository(SystemSetting)
    private readonly systemSettingRepository: Repository<SystemSetting>,
  ) {}

  async find(): Promise<SystemSetting> {
    const systemInfoParams = await this.systemSettingRepository.find();

    return arrayToObject(systemInfoParams);
  }
}
