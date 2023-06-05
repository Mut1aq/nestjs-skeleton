import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { emptyDocumentWS } from '@shared/error-handling/empty-document.helper';
import { Model, Types, PopulateOptions } from 'mongoose';
import { UserDocument } from '../entities/user.entity';
import { User } from '../interfaces/user.interface';

@Injectable()
export class UserWSHelperService {
  constructor(@InjectModel('User') private userModel: Model<UserDocument>) {}
  async findByIDWS(userID: Types.ObjectId): Promise<User> {
    const user = await this.userModel.findById<User>(userID);
    emptyDocumentWS(user, 'user');
    return user!;
  }

  async findByIDAndPopulateWS(
    userID: Types.ObjectId,
    populateOptions: PopulateOptions,
  ) {
    const user = await this.userModel
      .findById<User>(userID)
      .populate(populateOptions);

    emptyDocumentWS(user, 'user');
    return user!;
  }
}
