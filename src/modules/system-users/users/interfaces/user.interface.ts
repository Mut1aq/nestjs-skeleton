import { Room } from '@modules/chat/rooms/interfaces/room.interface';
import { Role } from '@shared/enums/role.enum';
import { CloudinaryObject } from '@shared/interfaces/general/cloudinary-object.interface';
import { Document } from 'mongoose';

export interface User extends Document {
  email: string;
  password: string;
  username: string;
  phoneNumber: string;
  birthday: string;
  role: Role;
  profilePicture: CloudinaryObject;
  rooms: Room[];
}
