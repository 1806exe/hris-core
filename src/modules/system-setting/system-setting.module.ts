import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SystemSetting } from './entities/system-setting.entity';
import { SystemInfo } from './entities/system-info.entity';
import { SystemSettingController } from './controllers/system-setting.controller';
import { SystemInfoController } from './controllers/system-info.controller';
import { SystemSettingService } from './services/system-setting.service';
import { SystemInfoService } from './services/system-info.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'basic', session: true }),
    TypeOrmModule.forFeature([SystemSetting, SystemInfo]),
  ],
  controllers: [SystemSettingController, SystemInfoController],
  providers: [SystemSettingService, SystemInfoService],
})
export class SystemSettingModule {}
