// import { UnauthorizedException } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import {
//   ConnectedSocket,
//   MessageBody,
//   OnGatewayConnection,
//   OnGatewayDisconnect,
//   SubscribeMessage,
//   WebSocketGateway,
//   WebSocketServer,
// } from '@nestjs/websockets';
// import { Server, Socket } from 'socket.io';
// import { RoomDocument } from 'src/modules/room/entities/room.entity';
// import { ServerAPILogger } from 'src/services/logger/server-api.logger';
// import { FilterQueryDto } from 'src/shared/dtos/filter-query.dto';

// import { checkObjectNullability } from 'src/shared/util/check-nullability.util';
// import { ChatService } from '../chat.service';

// @WebSocketGateway({
//   cors: {
//     origin: '*',
//   },
// })
// export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
//   @WebSocketServer()
//   server!: Server;

//   constructor(
//     private readonly APILogger: ServerAPILogger,
//     private readonly configService: ConfigService,
//     private readonly chatService: ChatService,
//   ) {
//     this.APILogger.log(
//       `Socket Is Live, On Port ${this.configService.get('CHAT_PORT')}`,
//     );
//   }

//   onModuleInit() {}

//   @SubscribeMessage('message')
//   handleMessage(
//     @MessageBody() data: string,
//     @ConnectedSocket() client: Socket,
//   ): string {
//     // this.server.emit('message', 'test');
//     return 'Hello world!';
//   }

//   @SubscribeMessage('createRoom')
//   async onCreateRoom(socket: Socket, room: RoomDocument | string) {
//     return this.chatService.createRoomForChatSocket(
//       JSON.parse(room as string),
//       socket.data.user._doc._id,
//     );
//   }

//   @SubscribeMessage('findRooms')
//   async findRooms(socket: Socket, filterQueryDto: FilterQueryDto | string) {
//     const rooms = await this.chatService.findRooms(
//       JSON.parse(filterQueryDto as string),
//       socket.data.user._doc._id,
//     );
//     return this.server.to(socket.id).emit('rooms', rooms);
//   }

//   async handleConnection(socket: Socket) {
//     try {
//       const user = await this.chatService.findUserForChatSocket(socket);
//       this.APILogger.log(
//         `User Connected, ${user.username || user.email}`,
//         'WEB SOCKET',
//       );

//       if (!checkObjectNullability(user)) {
//         return this.disconnect(socket);
//       } else {
//         socket.data.user = user;
//         const userWithRooms = await this.chatService.findRoomsForUser(user._id);

//         await this.chatService.saveConnectedUser(userWithRooms, socket.id);

//         // Return only rooms connected to the client
//         return this.server.to(socket.id).emit('rooms', userWithRooms.rooms);
//       }
//     } catch {
//       return this.disconnect(socket);
//     }
//   }

//   private disconnect(socket: Socket) {
//     socket.emit('Error', new UnauthorizedException());
//     socket.disconnect();
//   }

//   async handleDisconnect(socket: Socket) {
//     await this.chatService.deleteConnectedUserFromDB(socket.id);
//     this.APILogger.log('User Disconnected', 'WEB SOCKET');
//     socket.disconnect();
//   }

//   afterInit(server: any) {}
// }
