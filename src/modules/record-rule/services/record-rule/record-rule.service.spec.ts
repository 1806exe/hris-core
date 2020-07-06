import { Test, TestingModule } from '@nestjs/testing';
import { RecordRuleService } from './record-rule.service';

describe('RecordRuleService', () => {
  let service: RecordRuleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RecordRuleService],
    }).compile();

    service = module.get<RecordRuleService>(RecordRuleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
