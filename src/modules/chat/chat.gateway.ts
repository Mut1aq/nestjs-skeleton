import {
  HttpStatus,
  UseFilters,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  WsException,
  GatewayMetadata,
} from '@nestjs/websockets';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
} from '@nestjs/websockets/decorators';
import { I18nService } from 'nestjs-i18n';
import { Server } from 'socket.io';
import { WSAccessTokenGuard } from '@guards/ws-access-token.guard';
import { ServerAPILogger } from '@services/logger/server-api.logger';
import { checkNullability } from '@shared/util/check-nullability.util';
import { ChatService } from './chat.service';
import { Socket } from './interfaces/socket.interface';
import { CreateRoomDto } from './rooms/dto/create-room.dto';
import { CustomWSExceptionsFilter } from '@filters/custom-ws-exception.filter';
import { I18nTranslations } from 'generated/i18n.generated';
import { CreateMessageDto } from './messages/dto/create-message.dto';
import { ReturnMessage } from '@shared/interfaces/api/return-message.interface';
import { FilterQueryDto } from '@shared/dtos/queries/filter-query.dto';
import { MessagesPaginationDto } from './messages/dto/messages-pagination.dto';

@UseFilters(CustomWSExceptionsFilter)
@UseGuards(WSAccessTokenGuard)
@UsePipes(new ValidationPipe())
@WebSocketGateway<GatewayMetadata>({
  cors: {
    origin: '*',
  },
  serveClient: false,
  maxHttpBufferSize: 2024,
  namespace: 'chat',
})
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    private readonly configService: ConfigService,

    private readonly chatService: ChatService,

    private readonly APILogger: ServerAPILogger,

    private readonly i18n: I18nService<I18nTranslations>,
  ) {}

  @WebSocketServer()
  server!: Server;

  afterInit(_: Server) {
    this.APILogger.log(
      `Socket Is Live, On Port ${this.configService.get('CHAT_PORT')}`,
      'WEB SOCKET',
    );
  }

  async handleConnection(@ConnectedSocket() socket: Socket) {
    try {
      const user = await this.chatService.handleConnection(socket);

      return this.server.to(socket.id).emit('rooms', user.rooms);
    } catch (err: any) {
      socket.emit(
        'Error',
        new WsException(
          checkNullability(err.message)
            ? err.message
            : this.i18n.translate('auth.errors.unauthenticated'),
        ),
      );
      return socket.disconnect();
    }
  }

  @SubscribeMessage('createRoom')
  async onCreateRoom(
    @MessageBody() createRoomDto: CreateRoomDto,
    @ConnectedSocket() socket: Socket,
  ) {
    createRoomDto = JSON.parse(createRoomDto as any);

    return this.chatService.createChatRoom(createRoomDto, socket);
  }

  @SubscribeMessage('sendMessage')
  async onSendMessage(
    @MessageBody() createMessageDto: CreateMessageDto,
    @ConnectedSocket() socket: Socket,
  ): Promise<ReturnMessage> {
    createMessageDto = JSON.parse(createMessageDto as any);

    const socketID = await this.chatService.createMessage(
      createMessageDto,
      socket,
    );
    checkNullability(socketID)
      ? this.server.to(socketID!).emit('receiveMessage', createMessageDto.text)
      : null;

    return {
      message: this.i18n.translate('shared.success.create', {
        args: {
          entity: this.i18n.translate('shared.entities.ad'),
        },
      }),
      statusCode: HttpStatus.OK,
    };
  }

  @SubscribeMessage('roomsPagination')
  async onRoomsPagination(
    @MessageBody() filterQueryDto: FilterQueryDto,
    @ConnectedSocket() socket: Socket,
  ) {
    filterQueryDto = JSON.parse(filterQueryDto as any);

    return this.chatService.roomsPagination(socket, filterQueryDto);
  }

  @SubscribeMessage('messagesPagination')
  async onMessagesPagination(
    @MessageBody() messagesPaginationDto: MessagesPaginationDto,
    @ConnectedSocket() socket: Socket,
  ) {
    messagesPaginationDto = JSON.parse(messagesPaginationDto as any);

    return this.chatService.messagesPagination(socket, messagesPaginationDto);
  }

  async handleDisconnect(socket: Socket) {
    await this.chatService.handleDisconnect(socket);
  }
}
