import { Document } from 'mongoose';
import { User } from '@modules/system-users/users/interfaces/user.interface';
import { MessagesContainer } from '../../messages/interfaces/messages-container.interface';

export interface Room extends Document {
  users: User[];

  author: User;

  isDeleted: boolean;

  secondParty: User;

  messagesContainer: MessagesContainer;
}
