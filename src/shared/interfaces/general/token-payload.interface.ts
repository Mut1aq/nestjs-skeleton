import { Role } from '@shared/enums/role.enum';
import { Types } from 'mongoose';

/**
 * sub: user's id, sub is the standard JWT naming convention
 */
export interface TokenPayload {
  sub: Types.ObjectId;
  role: Role;
  iat: number;
  exp: number;
}
