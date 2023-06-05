import { Document } from 'mongoose';
import { User } from '@modules/system-users/users/interfaces/user.interface';
import { Room } from '@modules/chat/rooms/interfaces/room.interface';
import { MessagesContainer } from './messages-container.interface';

export interface Message extends Document {
  text: string;
  isDeleted: boolean;
  author: User;
  room: Room;
  messagesContainer: MessagesContainer;
  receiver: User;
}
