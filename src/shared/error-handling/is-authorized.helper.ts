import { User } from '@modules/system-users/users/interfaces/user.interface';
import { UnauthorizedException } from '@nestjs/common';
import { Types } from 'mongoose';
import { Action } from '../enums/action.enum';

/**
 * ! Throw an Exception if the user is not allowed to change the resource
 * @param author owner of the document
 * @param currentUserID current user that is extracted from the request
 */
export function isAuthor(
  author: Types.ObjectId | User,
  currentUserID: Types.ObjectId | User,
  action: Action,
) {
  if (author.toString() !== currentUserID.toString()) {
    throw new UnauthorizedException(`auth.errors.ability.${action}`);
  }
}
