import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { checkNullability } from '@shared/util/check-nullability.util';
import mongoose, { Types } from 'mongoose';

@Injectable()
export class MongoDBIDPipe implements PipeTransform {
  transform(mongoDBID: Types.ObjectId, _: ArgumentMetadata) {
    if (!mongoose.isValidObjectId(mongoDBID) || !checkNullability(mongoDBID)) {
      throw new HttpException(
        `validation.invalidMongoDBID`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return new Types.ObjectId(mongoDBID);
  }
}
