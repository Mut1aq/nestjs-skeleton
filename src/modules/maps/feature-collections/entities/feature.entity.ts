import {
  FeatureCollection,
  Geometry,
  Properties,
} from '@modules/maps/interfaces/feature-collection.interface';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type FeatureDocument = HydratedDocument<Feature>;

@Schema({
  validateBeforeSave: true,
  timestamps: true,
})
export class Feature {
  //********************* Register Data **********************/
  @Prop({
    trim: true,
    type: String,
  })
  type!: string;

  @Prop({
    type: Object,
  })
  properties!: Properties;

  @Prop({
    type: Object,
  })
  geometry!: Geometry;

  @Prop({
    type: Types.ObjectId,
    ref: 'FeatureCollection',
    required: true,
  })
  featureCollection!: FeatureCollection;
}
export const FeatureSchema = SchemaFactory.createForClass(Feature);

export const featureMongooseFeature = {
  name: Feature.name,
  schema: FeatureSchema,
};
