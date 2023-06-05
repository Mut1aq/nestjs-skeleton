import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@modules/system-users/users/interfaces/user.interface';
import { TokenPayload } from '@shared/interfaces/api/token-payload.interface';
import { WSActionLogger } from '@services/logger/ws-action.logger';
import { RoomsService } from './rooms/rooms.service';
import { Types } from 'mongoose';
import { WsException } from '@nestjs/websockets';
import { I18nService } from 'nestjs-i18n';
import { checkNullability } from '@shared/util/check-nullability.util';
import { Socket } from './interfaces/socket.interface';
import { SocketDataPayload } from './interfaces/socket-data-payload.interface';
import { CreateRoomDto } from './rooms/dto/create-room.dto';
import { roomPopulate } from './constants/room-populate.constant';
import { I18nTranslations } from 'generated/i18n.generated';
import { UserWSHelperService } from '@modules/system-users/users/services/user-ws-helper.service';
import { CreateMessageDto } from './messages/dto/create-message.dto';
import { MessagesService } from './messages/messages.service';
import { CacheService } from '@services/cache/cache.service';
import { FilterQueryDto } from '@shared/dtos/queries/filter-query.dto';
import { MessagesPaginationDto } from './messages/dto/messages-pagination.dto';

@Injectable()
export class ChatService {
  constructor(
    private readonly userWSHelperService: UserWSHelperService,

    private readonly WSLogger: WSActionLogger,

    private readonly cacheService: CacheService,

    private readonly messagesService: MessagesService,

    private readonly jwtService: JwtService,

    private readonly i18n: I18nService<I18nTranslations>,

    private readonly roomsService: RoomsService,
  ) {}

  async handleConnection(socket: Socket) {
    const user = await this.getUserWithRooms(socket);

    socket.data.user = this.returnSocketDataPayload(user);

    this.cacheService.hset(user._id.toString(), 'socketID', socket.id);

    return user;
  }

  async getUserWithRooms(socket: Socket): Promise<User> {
    const token = socket.handshake.auth.token;
    if (!checkNullability(token))
      throw new WsException(this.i18n.translate('auth.errors.unauthenticated'));
    const decodedToken = this.jwtService.decode(token) as TokenPayload;

    const user = await this.userWSHelperService.findByIDAndPopulateWS(
      decodedToken?.sub,
      roomPopulate,
    );

    this.WSLogger.actionLog(user?.email, user?._id, 'CONNECTED');

    if (!checkNullability(user))
      throw new WsException(this.i18n.translate('auth.errors.unauthenticated'));

    return user;
  }

  returnSocketDataPayload(user: User): SocketDataPayload {
    return {
      role: +user.role,
      sub: user._id?.toString(),
    };
  }

  async createChatRoom(createRoomDto: CreateRoomDto, socket: Socket) {
    return this.roomsService.create(createRoomDto, socket);
  }

  findUserByID(userID: Types.ObjectId) {
    return this.userWSHelperService.findByIDWS(userID);
  }

  async createMessage(createMessageDto: CreateMessageDto, socket: Socket) {
    const userID = await this.messagesService.createMessage(
      createMessageDto,
      socket.data.user?.sub!,
    );

    return this.cacheService.hgetByKey(userID.toString(), 'socketID');
  }

  async handleDisconnect(socket: Socket): Promise<void> {
    const socketDataPayload = socket.data.user;
    const user = await this.findUserByID(socketDataPayload?.sub!);

    this.WSLogger.actionLog(
      user?.email || 'WAS NOT LOGGED IN',
      user?._id || socketDataPayload?.sub,
      'DISCONNECTED',
    );

    socket.disconnect();
  }

  roomsPagination(socket: Socket, filterQueryDto: FilterQueryDto) {
    return this.roomsService.roomsPagination(
      socket.data.user?.sub!,
      filterQueryDto,
    );
  }

  messagesPagination(
    socket: Socket,
    messagesPaginationDto: MessagesPaginationDto,
  ) {
    return this.messagesService.messagesPagination(
      socket.data.user?.sub!,
      messagesPaginationDto,
    );
  }
}
