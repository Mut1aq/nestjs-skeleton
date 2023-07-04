import { LoggerService } from '@nestjs/common';
import { createWriteStream, existsSync, mkdirSync, WriteStream } from 'fs';
import { format } from 'util';
import { Types } from 'mongoose';
import { UserType, Message, ObjectType } from './logger-helpers.interface';

export class ServerActionLogger implements LoggerService {
  logFile: WriteStream | null = null;
  filePath = './logs/eve-action.log';
  constructor() {
    this._createOrPrepareActionFile();
  }

  debug(_: any, __: string = 'DEBUG') {}
  error(_: any, __: string = 'ERROR') {}
  log(_: any, __: string = 'LOG') {}
  verbose(_: any, __ = 'VERBOSE') {}
  warn(_: any, __ = 'WARN') {}

  actionLog(
    email: string,
    userType: UserType,
    userID: Types.ObjectId,
    message: Message,
    object: ObjectType,
    objectID: Types.ObjectId,
  ) {
    this._logAction(
      this._formatMessageForLogFile(
        email,
        userType,
        userID,
        message,
        object,
        objectID,
      ),
    );
  }

  private _logAction(message: string) {
    this.logFile?.write(format('', message) + '\n');
  }

  private _formatMessageForLogFile(
    email: string,
    userType: UserType,
    userID: Types.ObjectId,
    message: Message,
    object: ObjectType,
    objectID: Types.ObjectId,
  ) {
    return `[${userType}] ${email} - [ID] ${userID} - [ON] ${this._getDate()} - ${message} - [A] ${object} - [ID] ${objectID}`;
  }

  private _getDate() {
    const localeStringOptions: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      day: '2-digit',
      month: '2-digit',
    };
    return new Date(Date.now()).toLocaleString(undefined, localeStringOptions);
  }

  private _createOrPrepareActionFile() {
    if (!existsSync('./logs')) {
      mkdirSync('./logs');
    }
    if (!existsSync(this.filePath)) {
      createWriteStream(this.filePath, { flags: 'a' });
    }
    if (!this.logFile)
      this.logFile = createWriteStream(this.filePath, { flags: 'a' });
  }
}
