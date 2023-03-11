import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateConnectedUserDto } from './dto/create-connected-user.dto';
import {
  ConnectedUser,
  ConnectedUserDocument,
} from './entities/connected-user.entity';

@Injectable()
export class ConnectedUsersService {
  constructor(
    @InjectModel(ConnectedUser.name)
    private readonly connectedUserModel: Model<ConnectedUserDocument>,
  ) {}

  async create(createConnectedUserDto: CreateConnectedUserDto) {
    const connectedUser = new this.connectedUserModel(createConnectedUserDto);
    await connectedUser.save();
  }

  findOne(userID: Types.ObjectId) {
    return this.connectedUserModel.findById(userID);
  }

  remove(socketID: string) {
    return this.connectedUserModel.deleteOne({ socketID });
  }
}
