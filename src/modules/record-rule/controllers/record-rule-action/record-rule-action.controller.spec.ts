import { Test, TestingModule } from '@nestjs/testing';
import { RecordRuleActionController } from './record-rule-action.controller';

describe('RecordRuleAction Controller', () => {
  let controller: RecordRuleActionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecordRuleActionController],
    }).compile();

    controller = module.get<RecordRuleActionController>(
      RecordRuleActionController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
