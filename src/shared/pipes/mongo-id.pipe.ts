import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import mongoose from 'mongoose';

@Injectable()
export class MongoDBIDPipe implements PipeTransform {
  transform(mongoDBID: any, metadata: ArgumentMetadata) {
    if (!mongoose.isValidObjectId(mongoDBID)) {
      throw new HttpException(
        `validation.invalidMongoDBID`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return mongoDBID;
  }
}
