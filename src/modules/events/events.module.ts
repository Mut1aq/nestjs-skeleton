import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { ChatModule } from './chat/chat.module';

@Module({
  providers: [EventsService],
  imports: [ChatModule],
  exports: [ChatModule],
})
export class EventsModule {}
