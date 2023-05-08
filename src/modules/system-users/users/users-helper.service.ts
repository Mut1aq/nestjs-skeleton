import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { emptyDocument } from '@shared/error-handling/empty-document.helper';
import { Model, PopulateOptions, Types } from 'mongoose';
import { UserDocument } from './entities/user.entity';
import { User } from './interfaces/user.interface';

@Injectable()
export class UsersHelperService {
  constructor(@InjectModel('User') private userModel: Model<UserDocument>) {}

  async findOneByCredentials(credentials: string): Promise<User> {
    let user = await this.userModel.findOne<User>({
      $or: [
        {
          email: credentials,
        },
        {
          username: credentials,
        },
      ],
    });
    if (!user)
      throw new HttpException(
        'auth.errors.wrongEmailOrPassword',
        HttpStatus.UNAUTHORIZED,
      );

    return user;
  }

  async findByID(userID: Types.ObjectId): Promise<User> {
    const user = await this.userModel.findById<User>(userID);
    emptyDocument(user, 'user');
    return user!;
  }

  async findByIDAndPopulate(
    userID: Types.ObjectId,
    populateOptions: PopulateOptions,
  ) {
    const user = await this.userModel
      .findById<User>(userID)
      .populate(populateOptions);
    emptyDocument(user, 'user');
    return user!;
  }
}
