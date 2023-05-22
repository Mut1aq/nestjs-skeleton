import { Test, TestingModule } from '@nestjs/testing';
import { FeatureCollectionsService } from './feature-collections.service';

describe('FeatureCollectionsService', () => {
  let service: FeatureCollectionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FeatureCollectionsService],
    }).compile();

    service = module.get<FeatureCollectionsService>(FeatureCollectionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
