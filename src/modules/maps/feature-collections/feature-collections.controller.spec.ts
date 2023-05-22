import { Test, TestingModule } from '@nestjs/testing';
import { FeatureCollectionsController } from './feature-collections.controller';
import { FeatureCollectionsService } from './feature-collections.service';

describe('FeatureCollectionsController', () => {
  let controller: FeatureCollectionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FeatureCollectionsController],
      providers: [FeatureCollectionsService],
    }).compile();

    controller = module.get<FeatureCollectionsController>(FeatureCollectionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
