import { Types } from 'mongoose';

/**
 * sub: user's id, sub is the standard JWT naming convention
 */
export interface Payload {
  sub: Types.ObjectId | undefined;
}
