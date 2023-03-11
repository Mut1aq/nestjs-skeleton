import { Document } from 'mongoose';

import { User } from '../../users/interfaces/user.interface';

export interface Admin extends Document {
  email: string;

  password: string;

  deletedUsers: User[];
}
