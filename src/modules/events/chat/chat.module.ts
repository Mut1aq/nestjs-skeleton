// import { Module } from '@nestjs/common';
// import { ConfigModule, ConfigService } from '@nestjs/config';
// import { JwtModule } from '@nestjs/jwt';
// import { RoomModule } from 'src/modules/room/room.module';
// import { UserModule } from 'src/modules/system-users/user/user.module';
// import { ServicesModule } from 'src/services/services.module';
// import { ChatService } from './chat.service';
// import { ChatGateway } from './gateway/chat.gateway';
// import { ConnectedUsersModule } from './connected-users/connected-users.module';

// @Module({
//   imports: [
//     ServicesModule,
//     UserModule,
//     RoomModule,
//     JwtModule.registerAsync({
//       imports: [ConfigModule],
//       inject: [ConfigService],
//       useFactory: async (configService: ConfigService) => ({
//         secret: configService.get('TOKEN_SECRET'),
//         signOptions: configService.get('EXPIRES_IN'),
//       }),
//     }),
//     ConnectedUsersModule,
//   ],
//   controllers: [],
//   providers: [ChatGateway, ChatService],
//   exports: [ChatGateway, ChatService, ConnectedUsersModule],
// })
// export class ChatModule {}
