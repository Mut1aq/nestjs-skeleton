import { HttpException, HttpStatus } from '@nestjs/common';
import { checkObjectNullability } from '../util/check-nullability.util';

/**
 * ! Throw an Exception if the document is deleted
 * @param document mongoDBDocument
 * @param name name of the collection for better error handling
 */
export function isDeleted<T>(
  document: (T & { isDeleted: boolean | string }) | null,
  name: string,
) {
  if (
    document?.isDeleted ||
    document?.isDeleted === 'true' ||
    !checkObjectNullability(document)
  ) {
    throw new HttpException('shared.errors.' + name, HttpStatus.GONE);
  }
}
