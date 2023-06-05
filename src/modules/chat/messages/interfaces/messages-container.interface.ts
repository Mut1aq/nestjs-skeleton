import { Document } from 'mongoose';
import { Room } from '../../rooms/interfaces/room.interface';
import { Message } from './message.interface';

export interface MessagesContainer extends Document {
  isDeleted: boolean;

  messages: Message[];

  room: Room;
}
