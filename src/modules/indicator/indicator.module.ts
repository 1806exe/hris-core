import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IndicatorService } from './services/indicator.service';
import { IndicatorController } from './controllers/indicator.controller';
import { Indicator } from './entities/indicator.entity';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'basic', session: true }),
    TypeOrmModule.forFeature([Indicator]),
  ],
  controllers: [IndicatorController],
  providers: [IndicatorService],
  exports: [IndicatorService],
})
export class IndicatorModule {}
