import { User } from '@modules/system-users/users/interfaces/user.interface';
import { Document } from 'mongoose';

export interface Notification extends Document {
  body: string;

  title: string;

  author: User;
}
