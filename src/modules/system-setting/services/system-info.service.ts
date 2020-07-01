import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { arrayToObject } from '../../../core/helpers/array-to-object.helper';
import { Repository } from 'typeorm';

import { SystemInfo } from '../entities/system-info.entity';

@Injectable()
export class SystemInfoService {
  constructor(
    @InjectRepository(SystemInfo)
    private readonly systemInfoRepository: Repository<SystemInfo>,
  ) {}

  async find(): Promise<SystemInfo> {
    const systemInfoParams = await this.systemInfoRepository.find();

    return arrayToObject(systemInfoParams);
  }
}
