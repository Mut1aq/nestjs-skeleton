import {
  createParamDecorator,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import mongoose, { Types } from 'mongoose';
import { Request } from '@shared/interfaces/api/request.interface';
import { checkNullability } from '@shared/util/check-nullability.util';

export const UserID = createParamDecorator(
  (_: unknown, ctx: ExecutionContext) => {
    let request: Request = ctx.switchToHttp().getRequest();

    if (ctx.getType() === 'ws') {
      request = ctx.switchToWs().getClient().handshake;
    }

    const userID = request?.user?.sub;
    if (!mongoose.isValidObjectId(userID) || !checkNullability(userID)) {
      throw new HttpException(
        `validation.invalidMongoDBID`,
        HttpStatus.NOT_ACCEPTABLE,
      );
    }
    return new Types.ObjectId(userID);
  },
);
