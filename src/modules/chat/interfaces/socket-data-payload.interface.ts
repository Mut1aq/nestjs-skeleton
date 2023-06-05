import { Types } from 'mongoose';
import { Role } from '@shared/enums/role.enum';

export interface SocketDataPayload {
  sub: Types.ObjectId;
  role: Role;
}
