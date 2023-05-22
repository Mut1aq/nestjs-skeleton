import { Module } from '@nestjs/common';
import { FeatureCollectionsModule } from './feature-collections/feature-collections.module';

@Module({
  controllers: [],
  providers: [],
  imports: [FeatureCollectionsModule],
})
export class MapsModule {}
