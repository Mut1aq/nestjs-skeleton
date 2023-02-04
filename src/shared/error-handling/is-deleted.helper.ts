import { HttpException, HttpStatus } from '@nestjs/common';
import { MongoDocument } from '../interfaces/general/mongo-document.interface';

/**
 * ! Throw an Exception if the document is deleted
 * @param document mongoDBDocument (category, city, user)
 * @param name name of the collection for better error handling
 */
export function isDeleted(
  document: Partial<MongoDocument | undefined>,
  name: string,
) {
  if (document?.isDeleted || document?.isDeleted === 'true') {
    throw new HttpException('shared.errors.deleted.' + name, HttpStatus.GONE);
  }
}
