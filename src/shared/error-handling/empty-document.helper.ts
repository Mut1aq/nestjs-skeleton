import { HttpException, HttpStatus } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { checkObjectNullability } from '../util/check-nullability.util';
/**
 * #### throw error if the document is empty
 *
 * @param document MongoDb Document
 * @param name Name of the Collection that document belongs to
 */
export function emptyDocument<T>(document: T, name: string): void {
  if (!checkObjectNullability(document) || (document as T[])?.length < 1) {
    throw new HttpException('shared.errors.' + name, HttpStatus.NOT_FOUND);
  }
}
/**
 * #### throw error if the document is empty
 *
 * @param document MongoDb Document
 * @param name Name of the Collection that document belongs to
 */
export function emptyDocumentWS<T>(
  document: T,
  name: string,
): WsException | undefined {
  if (!document || (document as T[])?.length < 1) {
    return new WsException('shared.errors.' + name);
  }
  return undefined;
}
