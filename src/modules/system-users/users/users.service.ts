import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FilterUsersDto } from './dto/filter-users.dto';
import { UserDocument } from './entities/user.entity';
import { User } from './interfaces/user.interface';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private userModel: Model<UserDocument>) {}

  async findAll(filterUsersDto: FilterUsersDto): Promise<User[]> {
    const { skip, limit } = filterUsersDto;

    return this.userModel.find<User>().skip(skip).limit(limit).exec();
  }

  async countAll(): Promise<number> {
    return this.userModel.countDocuments();
  }
}
