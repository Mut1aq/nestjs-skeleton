import { Module } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { MongooseModule } from '@nestjs/mongoose';
import { roomMongooseFeature } from './entities/room.entity';
import { UsersModule } from '@modules/system-users/users/users.module';
import { MessagesModule } from '../messages/messages.module';

@Module({
  providers: [RoomsService],
  exports: [RoomsService],
  imports: [
    MongooseModule.forFeature([roomMongooseFeature]),
    UsersModule,
    MessagesModule,
  ],
})
export class RoomsModule {}
