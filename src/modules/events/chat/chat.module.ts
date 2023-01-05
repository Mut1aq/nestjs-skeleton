import { Module } from '@nestjs/common';
import { ServicesModule } from 'src/services/services.module';
import { ChatService } from './chat.service';
import { ChatGateway } from './gateway/chat.gateway';

@Module({
  imports: [ServicesModule],
  controllers: [],
  providers: [ChatGateway, ChatService],
  exports: [ChatGateway, ChatService],
})
export class ChatModule {}
