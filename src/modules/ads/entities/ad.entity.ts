import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CloudinaryObject } from '@shared/interfaces/general/cloudinary-object.interface';
import { HydratedDocument } from 'mongoose';

export type AdDocument = HydratedDocument<Ad>;

@Schema({
  validateBeforeSave: true,
  timestamps: true,
})
export class Ad {
  @Prop({
    type: {
      url: String,
      publicID: String,
      _id: false,
    },
    required: false,
  })
  image!: CloudinaryObject;

  @Prop({
    type: String,
  })
  expiry!: string;
}

export const AdSchema = SchemaFactory.createForClass(Ad);
