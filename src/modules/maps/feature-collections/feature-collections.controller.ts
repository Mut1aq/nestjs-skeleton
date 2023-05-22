import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { FeatureCollectionsService } from './feature-collections.service';
import { CreateFeatureCollectionDto } from './dto/create-feature-collection.dto';
import { CreateFeatureDto } from './dto/create-feature.dto';
import { Types } from 'mongoose';
import { MongoDBIDPipe } from '@pipes/mongo-id.pipe';

@Controller('feature-collections')
export class FeatureCollectionsController {
  constructor(
    private readonly featureCollectionsService: FeatureCollectionsService,
  ) {}

  @Post()
  createFeatureCollection(
    @Body() createFeatureCollectionDto: CreateFeatureCollectionDto,
  ) {
    return this.featureCollectionsService.createFeatureCollection(
      createFeatureCollectionDto,
    );
  }

  @Post(':featureCollectionID')
  createFeature(
    @Body() createFeatureDto: CreateFeatureDto,

    @Param('featureCollectionID', new MongoDBIDPipe())
    featureCollectionID: Types.ObjectId,
  ) {
    return this.featureCollectionsService.createFeature(
      createFeatureDto,
      featureCollectionID,
    );
  }

  @Get()
  findAll() {
    return this.featureCollectionsService.findAll();
  }
}
