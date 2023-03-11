import { Document, HydratedDocument } from 'mongoose';

export interface MongoDocument extends HydratedDocument<Document> {
  isDeleted?: boolean | string;
}
