import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type BaseMapDocument = HydratedDocument<BaseMap>;

@Schema({
  validateBeforeSave: true,
  timestamps: true,
})
export class BaseMap {
  //********************* Register Data **********************/
  @Prop({
    type: String,
    required: true,
    trim: true,
    unique: true,
  })
  name!: string;

  @Prop({
    type: String,
    required: true,
    trim: true,
    unique: true,
  })
  url!: string;
}
export const BaseMapSchema = SchemaFactory.createForClass(BaseMap);

export const baseMapMongooseFeature = {
  name: BaseMap.name,
  schema: BaseMapSchema,
};
