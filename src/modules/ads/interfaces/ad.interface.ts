import { CloudinaryObject } from '@shared/interfaces/general/cloudinary-object.interface';
import { Document } from 'mongoose';

export interface Ad extends Document {
  image: CloudinaryObject;

  expiry: string;
}
