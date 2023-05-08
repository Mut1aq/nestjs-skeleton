import {
  createParamDecorator,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import mongoose from 'mongoose';
import { Request } from '@shared/interfaces/general/request.interface';
import { checkNullability } from '@shared/util/check-nullability.util';

export const UserID = createParamDecorator(
  (_: unknown, ctx: ExecutionContext) => {
    const request: Request = ctx.switchToHttp().getRequest();
    const userID = request?.user?.sub;
    if (!mongoose.isValidObjectId(userID) && checkNullability(userID)) {
      throw new HttpException(
        `validation.invalidMongoDBID`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return userID;
  },
);
