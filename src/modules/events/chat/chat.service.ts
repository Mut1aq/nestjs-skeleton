// import { Injectable } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
// import { Socket } from 'dgram';
// import { Types } from 'mongoose';
// import { CreateRoomDto } from 'src/modules/room/dto/create-room.dto';
// import { RoomDocument } from 'src/modules/room/entities/room.entity';
// import { RoomService } from 'src/modules/room/room.service';
// import { User } from 'src/modules/system-users/users/entities/user.entity';
// import { UserService } from 'src/modules/system-users/users/users.service';
// import { FilterQueryDto } from 'src/shared/dtos/filter-query.dto';
// import { TokenPayload } from 'src/shared/interfaces/api/token-payload.interface';
// import { ConnectedUsersService } from './connected-users/connected-users.service';
// import { CreateConnectedUserDto } from './connected-users/dto/create-connected-user.dto';

// @Injectable()
// export class ChatService {
//   constructor(
//     private readonly userService: UserService,
//     private readonly jwtService: JwtService,
//     private readonly roomService: RoomService,
//     private readonly connectedUsersService: ConnectedUsersService,
//   ) {}

//   async findUserForChatSocket(socket: Socket): Promise<User> {
//     const decodedToken: TokenPayload = this.jwtService.decode(
//       socket?.handshake?.auth?.token,
//     ) as TokenPayload;
//     const user: User = await this.userService.findOneByIDForChatSocket(
//       decodedToken._id,
//     );
//     return user;
//   }

//   async findRoomsForUser(userID: Types.ObjectId) {
//     return this.userService.findOneByIDForChatSocket(userID);
//   }

//   async createRoomForChatSocket(room: RoomDocument, userID: Types.ObjectId) {
//     const createRoomDto: CreateRoomDto = {
//       author: userID,
//       name: room.name,
//     };
//     return this.roomService.create(createRoomDto);
//   }

//   async findRooms(filterQueryDto: FilterQueryDto, userID: Types.ObjectId) {
//     return this.roomService.findAll(filterQueryDto, userID);
//   }

//   saveConnectedUser(user: User, socketID: string) {
//     const createConnectedUserDto: CreateConnectedUserDto = {
//       socketID,
//       user,
//     };
//     return this.connectedUsersService.create(createConnectedUserDto);
//   }

//   deleteConnectedUserFromDB(socketID: string) {
//     return this.connectedUsersService.remove(socketID);
//   }
// }
