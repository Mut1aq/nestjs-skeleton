import { Test, TestingModule } from '@nestjs/testing';
import { AdsService } from './ads.service';

describe('AdsService', () => {
  let service: AdsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdsService],
    }).compile();

    service = module.get<AdsService>(AdsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
