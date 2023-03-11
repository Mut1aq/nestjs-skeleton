import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { FilterUsersDto } from '../users/dto/filter-users.dto';
import * as bcrypt from 'bcrypt';
import { UserDocument } from '../users/entities/user.entity';
import { emptyDocument } from 'src/shared/error-handling/empty-document.helper';
import { ConfigService } from '@nestjs/config';
import { User } from './interfaces/user.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private userModel: Model<UserDocument>,

    private readonly configService: ConfigService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<void> {
    const user = new this.userModel(createUserDto);

    const salt = await bcrypt.genSalt(
      +(this.configService.get<number>('SALT_ROUNDS') as number),
    );
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();
  }

  async findOneByCredentials(username: string, email: string): Promise<User> {
    let user = (await this.userModel.findOne({
      $or: [
        {
          email,
        },
        {
          username,
        },
      ],
    })) as User;
    if (!user)
      throw new HttpException(
        'auth.errors.wrongEmailOrPassword',
        HttpStatus.UNAUTHORIZED,
      );

    return user;
  }

  async findAll(filterUsersDto: FilterUsersDto): Promise<User[]> {
    const { skip, limit } = filterUsersDto;

    return this.userModel
      .find<User>()

      .skip(skip || 0)
      .limit(limit || 100000)
      .exec();
  }

  async countAll(): Promise<number> {
    return this.userModel.countDocuments();
  }

  async findByID(userID: Types.ObjectId): Promise<User> {
    const user = await this.userModel.findById(userID);
    emptyDocument(user, 'user');
    return user as User;
  }

  async findOneByIDForChatSocket(userID: Types.ObjectId): Promise<User> {
    const user = await this.userModel.findById(userID).populate('rooms');
    emptyDocument(user, 'user');
    return user as User;
  }
}
