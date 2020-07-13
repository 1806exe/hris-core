import { Test, TestingModule } from '@nestjs/testing';
import { RecordRuleController } from './record-rule.controller';

describe('RecordRule Controller', () => {
  let controller: RecordRuleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecordRuleController],
    }).compile();

    controller = module.get<RecordRuleController>(RecordRuleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
