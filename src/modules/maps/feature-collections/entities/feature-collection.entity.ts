import {
  Crs,
  Feature,
} from '@modules/maps/interfaces/feature-collection.interface';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type FeatureCollectionDocument = HydratedDocument<FeatureCollection>;

@Schema({
  validateBeforeSave: true,
  timestamps: true,
})
export class FeatureCollection {
  //********************* Register Data **********************/

  @Prop({
    type: String,

    trim: true,
  })
  name!: string;

  @Prop({
    type: String,

    trim: true,
  })
  type!: string;

  @Prop({
    type: {
      type: String,
      properties: Object,
    },
  })
  crs!: Crs;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Feature' }] })
  features!: Feature[];
}
export const FeatureCollectionSchema =
  SchemaFactory.createForClass(FeatureCollection);

export const featureCollectionMongooseFeature = {
  name: FeatureCollection.name,
  schema: FeatureCollectionSchema,
};
