import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
// import { ChatModule } from './chat/chat.module';
import { NotificationsModule } from './notifications/notifications.module';

@Module({
  providers: [EventsService],
  imports: [NotificationsModule],
  exports: [],
})
export class EventsModule {}
