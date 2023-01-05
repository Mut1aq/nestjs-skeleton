import { ConfigService } from '@nestjs/config';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ServerLogger } from 'src/services/logger/server-logger';
// import { ChatService } from '../chat.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway {
  constructor(
    private readonly logger: ServerLogger, // private readonly chatService: ChatService
    private readonly configService: ConfigService,
  ) {}

  webSocketLog: string = `Socket Is Live, On Port ${this.configService.get(
    'CHAT_PORT',
  )}`;

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('message')
  handleMessage(
    @MessageBody() data: string,
    @ConnectedSocket() client: Socket,
  ): string {
    return 'Hello world!';
  }

  handleConnection(client: any, ...args: any[]) {
    this.logger.log('User Connected, ' + this.webSocketLog, 'WEB SOCKET');
  }

  handleDisconnect(client: any) {
    this.logger.log('User Disconnected', 'WEB SOCKET');
  }

  afterInit(server: any) {
    this.logger.log(this.webSocketLog, 'WEB SOCKET');
  }
}
