import { Module } from '@nestjs/common';
import { FeatureCollectionsService } from './feature-collections.service';
import { FeatureCollectionsController } from './feature-collections.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { featureCollectionMongooseFeature } from './entities/feature-collection.entity';
import { featureMongooseFeature } from './entities/feature.entity';

@Module({
  controllers: [FeatureCollectionsController],
  providers: [FeatureCollectionsService],
  imports: [
    MongooseModule.forFeature([
      featureCollectionMongooseFeature,
      featureMongooseFeature,
    ]),
  ],
})
export class FeatureCollectionsModule {}
