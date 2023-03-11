import { Types } from 'mongoose';
import { Role } from 'src/shared/enums/role.enum';

/**
 * sub: user's id, sub is the standard JWT naming convention
 */
export interface TokenPayload {
  sub: Types.ObjectId;
  role: Role;
  iat: number;
  exp: number;
}
