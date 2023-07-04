import { Module } from '@nestjs/common';
import { UsersModule } from '@modules/system-users/users/users.module';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';
import { RoomsModule } from './rooms/rooms.module';
import { WSAccessTokenGuard } from '@guards/ws-access-token.guard';
import { JWTOptions } from '@shared/configs/app-options';
import { JwtModule } from '@nestjs/jwt';
import { MessagesModule } from './messages/messages.module';
import { LoggerModule } from '@services/logger/logger.module';

@Module({
  imports: [
    LoggerModule,
    UsersModule,
    RoomsModule,
    JwtModule.registerAsync(JWTOptions),
    MessagesModule,
  ],
  providers: [ChatGateway, ChatService, WSAccessTokenGuard],
  controllers: [],
  exports: [],
})
export class ChatModule {}
