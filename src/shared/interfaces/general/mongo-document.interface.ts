import { Document } from 'mongoose';

export interface MongoDocument extends Document {
  isDeleted?: boolean | string;
  _doc?: any;
}
