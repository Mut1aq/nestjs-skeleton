import { Module } from '@nestjs/common';
import { MapsService } from './maps.service';
import { MapsController } from './maps.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { featureCollectionMongooseFeature } from './entities/feature-collection.entity';
import { baseMapMongooseFeature } from './entities/base-map.entity';
import { featureMongooseFeature } from './entities/feature.entity';

@Module({
  controllers: [MapsController],
  providers: [MapsService],
  imports: [
    MongooseModule.forFeature([
      featureCollectionMongooseFeature,
      featureMongooseFeature,
      baseMapMongooseFeature,
    ]),
  ],
})
export class MapsModule {}
