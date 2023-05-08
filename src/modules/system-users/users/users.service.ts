import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types, PopulateOptions } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { FilterUsersDto } from './dto/filter-users.dto';
import { UserDocument } from './entities/user.entity';
import { User } from './interfaces/user.interface';
import { UsersHelperService } from './users-helper.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private userModel: Model<UserDocument>,

    private readonly configService: ConfigService,

    private readonly usersHelperService: UsersHelperService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<void> {
    const user = new this.userModel(createUserDto);

    const salt = await bcrypt.genSalt(
      +(this.configService.get<number>('SALT_ROUNDS') as number),
    );
    user.password = await bcrypt.hash(user.password, salt);
  }

  async findByID(userID: Types.ObjectId): Promise<User> {
    return this.usersHelperService.findByID(userID);
  }

  async findByIDAndPopulate(
    userID: Types.ObjectId,
    populateOptions: PopulateOptions,
  ) {
    return this.usersHelperService.findByIDAndPopulate(userID, populateOptions);
  }

  async findOneByCredentials(credentials: string): Promise<User> {
    return this.usersHelperService.findOneByCredentials(credentials);
  }

  async findAll(filterUsersDto: FilterUsersDto): Promise<User[]> {
    const { skip, limit } = filterUsersDto;

    return this.userModel.find<User>().skip(skip).limit(limit).exec();
  }

  async countAll(): Promise<number> {
    return this.userModel.countDocuments();
  }
}
