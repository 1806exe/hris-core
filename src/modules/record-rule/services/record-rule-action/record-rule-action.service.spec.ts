import { Test, TestingModule } from '@nestjs/testing';
import { RecordRuleActionService } from './record-rule-action.service';

describe('RecordRuleActionService', () => {
  let service: RecordRuleActionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RecordRuleActionService],
    }).compile();

    service = module.get<RecordRuleActionService>(RecordRuleActionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
