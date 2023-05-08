import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { emptyDocument } from '@shared/error-handling/empty-document.helper';
import { Model, Types } from 'mongoose';
import { CreateBaseMapDto } from './dto/create-base-map.dto';
import { CreateFeatureCollectionDto } from './dto/create-feature-collection.dto';
import { CreateFeatureDto } from './dto/create-feature.dto';
import { CreateFeaturesDto } from './dto/create-features.dto';
import { BaseMapDocument } from './entities/base-map.entity';
import { FeatureCollectionDocument } from './entities/feature-collection.entity';
import { Feature, FeatureDocument } from './entities/feature.entity';

@Injectable()
export class MapsService {
  constructor(
    @InjectModel('FeatureCollection')
    private readonly featureCollectionModel: Model<FeatureCollectionDocument>,

    @InjectModel('Feature')
    private readonly featureModel: Model<FeatureDocument>,

    @InjectModel('BaseMap')
    private readonly baseMapModel: Model<BaseMapDocument>,
  ) {}

  createFeatureCollection(
    createFeatureCollectionDto: CreateFeatureCollectionDto,
  ) {
    const featureCollection = new this.featureCollectionModel(
      createFeatureCollectionDto,
    );
    featureCollection.save();
  }

  async createFeature(
    createFeatureDto: CreateFeatureDto,
    featureCollectionID: Types.ObjectId,
  ) {
    const featureCollection = await this.featureCollectionModel.findById(
      featureCollectionID,
    );

    emptyDocument(featureCollection, 'featureCollection');

    const feature = new this.featureModel(createFeatureDto);
    feature.featureCollection = featureCollection!;
    featureCollection?.features.push(feature);
    await Promise.all([feature.save(), featureCollection?.save()]);
  }

  async createFeatures(
    createFeaturesDto: CreateFeaturesDto,
    featureCollectionID: Types.ObjectId,
  ) {
    const featureCollection = await this.featureCollectionModel.findById(
      featureCollectionID,
    );

    emptyDocument(featureCollection, 'featureCollection');

    let features: Feature[] = [];

    for (let feature of createFeaturesDto.features) {
      feature = new this.featureModel(feature);
      feature.featureCollection = featureCollection!;
      features.push(feature);
    }

    featureCollection?.features.push(...features);
    await Promise.all([
      this.featureModel.insertMany(features),
      featureCollection?.save(),
    ]);
  }

  createBaseMap(createBaseMapDto: CreateBaseMapDto) {
    const baseMap = new this.baseMapModel(createBaseMapDto);
    baseMap.save();
  }

  getGEOLayers() {
    return this.featureCollectionModel
      .find()
      .select({ name: 1, features: 1 })
      .populate({
        path: 'features',
        model: 'Feature',
        select: {
          properties: 1,
        },
      })
      .sort({ collectionOrder: 1 });
  }

  getFeatureCollections() {
    return this.featureCollectionModel.find().populate({
      path: 'features',
      model: 'Feature',
    });
  }
}
