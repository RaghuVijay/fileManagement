import { Test, TestingModule } from '@nestjs/testing';
import { AwsConfigTs } from './aws.config.ts';

describe('AwsConfigTs', () => {
  let provider: AwsConfigTs;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AwsConfigTs],
    }).compile();

    provider = module.get<AwsConfigTs>(AwsConfigTs);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
