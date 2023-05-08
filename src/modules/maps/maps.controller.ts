import { Body, Controller, Param, Post, Get } from '@nestjs/common';
import { MongoDBIDPipe } from '@pipes/mongo-id.pipe';
import { Types } from 'mongoose';
import { CreateBaseMapDto } from './dto/create-base-map.dto';
import { CreateFeatureCollectionDto } from './dto/create-feature-collection.dto';
import { CreateFeatureDto } from './dto/create-feature.dto';
import { CreateFeaturesDto } from './dto/create-features.dto';
import { MapsService } from './maps.service';

/**
 * ! This resource should be split apart to be a feature collection resource and basemap resource but i didn't split it apart till i was lazy
 * ! when i created it
 */
@Controller('maps')
export class MapsController {
  constructor(private readonly mapsService: MapsService) {}

  @Post('feature-collections')
  createFeatureCollection(
    @Body() createFeatureCollectionDto: CreateFeatureCollectionDto,
  ) {
    return this.mapsService.createFeatureCollection(createFeatureCollectionDto);
  }

  @Post('feature-collections/:featureCollectionID/features')
  createFeature(
    @Body() createFeatureDto: CreateFeatureDto,
    @Param('featureCollectionID', new MongoDBIDPipe())
    featureCollectionID: Types.ObjectId,
  ) {
    return this.mapsService.createFeature(
      createFeatureDto,
      featureCollectionID,
    );
  }

  @Post('feature-collections/:featureCollectionID/features/bulk')
  createFeatures(
    @Body() createFeaturesDto: CreateFeaturesDto,
    @Param('featureCollectionID', new MongoDBIDPipe())
    featureCollectionID: Types.ObjectId,
  ) {
    return this.mapsService.createFeatures(
      createFeaturesDto,
      featureCollectionID,
    );
  }

  @Post('base-maps')
  createBaseMap(@Body() createBaseMapDto: CreateBaseMapDto) {
    return this.mapsService.createBaseMap(createBaseMapDto);
  }

  @Get('geo-layers')
  getGEOLayers() {
    return this.mapsService.getGEOLayers();
  }

  @Get('feature-collections')
  getFeatureCollections() {
    return this.mapsService.getFeatureCollections();
  }
}
