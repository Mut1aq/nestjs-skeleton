import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { FeatureCollection } from '../interfaces/feature-collection.interface';
import { CreateFeatureCollectionDto } from './dto/create-feature-collection.dto';
import { CreateFeatureDto } from './dto/create-feature.dto';
import { FeatureCollectionDocument } from './entities/feature-collection.entity';
import { FeatureDocument } from './entities/feature.entity';

@Injectable()
export class FeatureCollectionsService {
  constructor(
    @InjectModel('FeatureCollection')
    private featureCollectionModel: Model<FeatureCollectionDocument>,

    @InjectModel('Feature')
    private featureModel: Model<FeatureDocument>,
  ) {}
  async createFeatureCollection(
    createFeatureCollectionDto: CreateFeatureCollectionDto,
  ) {
    const { features, ...basicFeatureCollection } = createFeatureCollectionDto;

    const featureCollection = new this.featureCollectionModel(
      basicFeatureCollection,
    );
    const chunkSize = 20000;
    const promises = [];
    for (let i = 0; i < features.length; i += chunkSize) {
      const featuresChunk = features.slice(i, i + chunkSize);

      for (let feature of featuresChunk) {
        feature = new this.featureModel(feature);
        feature.featureCollection = featureCollection!;
        featureCollection!.features.push(feature);
        promises.push(feature.save());
      }
      promises.push(featureCollection!.save());
      await Promise.all(promises);
      promises.splice(0);
    }
  }

  async createFeature(
    createFeatureDto: CreateFeatureDto,
    featureCollectionID: Types.ObjectId,
  ) {
    const featureCollection =
      await this.featureCollectionModel.findById<FeatureCollection>(
        featureCollectionID,
      );
    const { features } = createFeatureDto;

    const chunkSize = 20000;
    const promises = [];
    for (let i = 0; i < features.length; i += chunkSize) {
      const featuresChunk = features.slice(i, i + chunkSize);

      for (let feature of featuresChunk) {
        feature = new this.featureModel(feature);
        feature.featureCollection = featureCollection!;
        featureCollection!.features.push(feature);
        promises.push(feature.save());
      }
      promises.push(featureCollection!.save());
      await Promise.all(promises);
      promises.splice(0);
    }
  }

  async findAll() {
    await this.featureCollectionModel.findByIdAndDelete(
      '645c728af3a31c4cc4b9955f',
    );

    await this.featureModel.deleteMany({
      featureCollection: new Types.ObjectId('645c728af3a31c4cc4b9955f'),
    });
  }
}
