import { UserWSHelperService } from '@modules/system-users/users/services/user-ws-helper.service';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Room } from '../rooms/interfaces/room.interface';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { MessagesContainerDocument } from './entities/messages-container.entity';
import { MessageDocument } from './entities/message.entity';
import { MessagesContainer } from './interfaces/messages-container.interface';
import { WsException } from '@nestjs/websockets';
import { MessagesPaginationDto } from './dto/messages-pagination.dto';
import { checkNullability } from '@shared/util/check-nullability.util';
import { EmptyMongoQuery } from '@shared/interfaces/general/empty-mongodb-query.interface';
import { messagePopulate } from '../constants/message-populate.constant';

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel('Message') private messageModel: Model<MessageDocument>,

    @InjectModel('MessagesContainer')
    private messagesContainerModel: Model<MessagesContainerDocument>,

    private readonly userWSHelperService: UserWSHelperService,
  ) {}

  async createMessage(
    createMessageDto: CreateMessageDto,
    userID: Types.ObjectId,
  ) {
    const { text, messagesContainerID } = createMessageDto;
    const [messagesContainer, user] = await Promise.all([
      this.messagesContainerModel
        .findById<MessagesContainer>(messagesContainerID)
        .populate({
          path: 'room',
          model: 'Room',
          select: { secondParty: 1, author: 1 },
        }),
      this.userWSHelperService.findByIDWS(userID),
    ]);

    let receiver = undefined;

    if (messagesContainer?.room.author.toString() === userID.toString()) {
      receiver = messagesContainer.room.secondParty;
    } else if (
      messagesContainer?.room.secondParty.toString() === userID.toString()
    ) {
      receiver = messagesContainer.room.author;
    } else {
      throw new WsException('????');
    }

    const createdMessage = new this.messageModel({ text });
    createdMessage.messagesContainer = messagesContainer!;
    createdMessage.room = messagesContainer?.room!;
    createdMessage.author = user;
    createdMessage.receiver = receiver;
    messagesContainer.messages.push(createdMessage);

    await Promise.all([createdMessage.save(), messagesContainer.save()]);

    return receiver;
  }

  createMessagesContainer(room: Room) {
    const createdMessagesContainer = new this.messagesContainerModel({
      room: room._id,
    });
    return createdMessagesContainer.save();
  }

  messagesPagination(
    userID: Types.ObjectId,
    messagesPaginationDto: MessagesPaginationDto,
  ) {
    userID = new Types.ObjectId(userID);
    const { skip, limit, orderByDate, messagesContainerID } =
      messagesPaginationDto;

    const orderByDateFilter: EmptyMongoQuery = checkNullability(orderByDate)
      ? { _id: orderByDate }
      : { _id: 'desc' };

    return this.messagesContainerModel
      .findById<MessagesContainer>(messagesContainerID)
      .select({ messages: 1 })
      .populate(messagePopulate(limit, skip, orderByDateFilter))
      .exec();
  }

  findAll() {
    return `This action returns all messages`;
  }

  findOne(id: number) {
    return `This action returns a #${id} message`;
  }

  update(id: number, _updateMessageDto: UpdateMessageDto) {
    return `This action updates a #${id} message`;
  }

  remove(id: number) {
    return `This action removes a #${id} message`;
  }
}
