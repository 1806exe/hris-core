import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecordRule } from './entities/record-rule/record-rule.entity';
import { RecordRuleController } from './controllers/record-rule/record-rule.controller';
import { RecordRuleService } from './services/record-rule/record-rule.service';
import { RecordRuleAction } from './entities/record-rule-action/record-rule-action.entity';
import { RecordRuleActionController } from './controllers/record-rule-action/record-rule-action.controller';
import { RecordRuleActionService } from './services/record-rule-action/record-rule-action.service';

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'basic', session: true }),
        TypeOrmModule.forFeature([RecordRule, RecordRuleAction]),
    ],
    controllers: [RecordRuleController, RecordRuleActionController],
    providers: [RecordRuleService, RecordRuleActionService],
})
export class RecordRuleModule { }
