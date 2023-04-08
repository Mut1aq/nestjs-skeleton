import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Crs, Feature } from '../interfaces/geo-json.interface';

export type FeatureCollectionDocument = HydratedDocument<FeatureCollection>;

@Schema({
  validateBeforeSave: true,
  timestamps: true,
})
export class FeatureCollection {
  //********************* Register Data **********************/

  @Prop({
    type: String,
    required: true,
    trim: true,
  })
  name!: string;

  @Prop({
    type: String,
    required: true,
    trim: true,
  })
  type!: string;

  @Prop({
    type: {
      type: String,
      properties: {
        name: String,
      },
    },
  })
  crs!: Crs;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Feature' }] })
  features!: Feature[];

  @Prop({
    type: Number,
    required: true,
    min: 0,
  })
  collectionOrder!: number;
}
export const FeatureCollectionSchema =
  SchemaFactory.createForClass(FeatureCollection);

export const featureCollectionMongooseFeature = {
  name: FeatureCollection.name,
  schema: FeatureCollectionSchema,
};
