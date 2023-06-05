import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from '@modules/system-users/users/users.module';
import { messagesContainerMongooseFeature } from './entities/messages-container.entity';
import { messageMongooseFeature } from './entities/message.entity';
import { MessagesService } from './messages.service';

@Module({
  controllers: [],
  providers: [MessagesService],
  exports: [MessagesService],
  imports: [
    MongooseModule.forFeature([
      messagesContainerMongooseFeature,
      messageMongooseFeature,
    ]),
    UsersModule,
  ],
})
export class MessagesModule {}
