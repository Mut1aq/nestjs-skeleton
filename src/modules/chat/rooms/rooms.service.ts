import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { WsException } from '@nestjs/websockets';
import { Model, Types } from 'mongoose';
import { I18nService } from 'nestjs-i18n';
import { ReturnMessage } from '@shared/interfaces/api/return-message.interface';
import {
  checkNullability,
  checkObjectNullability,
} from '@shared/util/check-nullability.util';
import { MessagesService } from '../messages/messages.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { RoomDocument } from './entities/room.entity';
import { I18nTranslations } from 'generated/i18n.generated';
import { UserWSHelperService } from '@modules/system-users/users/services/user-ws-helper.service';
import { Socket } from '../interfaces/socket.interface';
import { FilterQueryDto } from '@shared/dtos/queries/filter-query.dto';
import { EmptyMongoQuery } from '@shared/interfaces/general/empty-mongodb-query.interface';
import { roomPaginationPopulate } from '../constants/room-populate.constant';

@Injectable()
export class RoomsService {
  constructor(
    @InjectModel('Room') private roomModel: Model<RoomDocument>,

    private readonly i18n: I18nService<I18nTranslations>,

    private readonly userWSHelperService: UserWSHelperService,

    private readonly messagesService: MessagesService,
  ) {}

  async create(
    createRoomDto: CreateRoomDto,
    socket: Socket,
  ): Promise<ReturnMessage> {
    const roomsPopulate = {
      path: 'rooms',
      model: 'Room',
      select: { author: 1, secondParty: 1, messagesContainer: 1, name: 1 },
      populate: {
        path: 'messagesContainer',
        model: 'MessagesContainer',
        options: {
          limit: 1,
          sort: { _id: -1 },
        },
      },
    };

    const createdRoom = new this.roomModel(createRoomDto);

    const [author, secondParty, messagesContainer] = await Promise.all([
      this.userWSHelperService.findByIDAndPopulateWS(
        createRoomDto.author,
        roomsPopulate,
      ),
      this.userWSHelperService.findByIDAndPopulateWS(
        createRoomDto.secondParty,
        roomsPopulate,
      ),
      this.messagesService.createMessagesContainer(createdRoom),
    ]);

    const authorHasRoomWithSecondParty = author.rooms.find(
      (room) =>
        room.secondParty.toString() === createRoomDto.secondParty.toString() ||
        room.author.toString() === createRoomDto.secondParty.toString(),
    );
    const secondPartyHasRoomWithAuthor = secondParty.rooms.find(
      (room) =>
        room.secondParty.toString() === createRoomDto.author.toString() ||
        room.author.toString() === createRoomDto.author.toString(),
    );

    if (
      checkObjectNullability(authorHasRoomWithSecondParty) ||
      checkObjectNullability(secondPartyHasRoomWithAuthor)
    )
      throw new WsException('chat.errors.youAlreadyHaveARoom');

    if (createRoomDto.author === createRoomDto.secondParty) {
      throw new WsException('chat.errors.roomWithYourSelf');
    }
    if (createRoomDto.author !== socket.data.user?.sub) {
      throw new WsException('auth.errors.unauthorized');
    }

    socket.data.room = createdRoom._id;

    secondParty.rooms.push(createdRoom);
    author.rooms.push(createdRoom);
    createdRoom.users.push(author, secondParty);
    createdRoom.messagesContainer = messagesContainer;

    await Promise.all([author.save(), secondParty.save(), createdRoom.save()]);

    return {
      message: this.i18n.translate('shared.success.create', {
        args: {
          entity: this.i18n.translate('shared.entities.room'),
        },
      }),
      statusCode: HttpStatus.CREATED,
    };
  }

  roomsPagination(userID: Types.ObjectId, filterQueryDto: FilterQueryDto) {
    userID = new Types.ObjectId(userID);
    const { skip, limit, orderByDate } = filterQueryDto;

    const orderByDateFilter: EmptyMongoQuery = checkNullability(orderByDate)
      ? { _id: orderByDate }
      : {};

    this.roomModel
      .find({ $or: [{ author: userID }, { secondParty: userID }] })
      .select({ secondParty: 1, name: 1, messagesContainer: 1 })
      .skip(skip)
      .limit(limit)
      .sort(orderByDateFilter)
      .populate(roomPaginationPopulate)
      .exec();
  }

  findAll() {
    return `This action returns all rooms`;
  }

  findOne(id: number) {
    return `This action returns a #${id} room`;
  }

  update(id: number, _updateRoomDto: UpdateRoomDto) {
    return `This action updates a #${id} room`;
  }

  remove(id: number) {
    return `This action removes a #${id} room`;
  }
}
