import { LoggerService } from '@nestjs/common';
import { createWriteStream, existsSync, mkdirSync, WriteStream } from 'fs';
import { format } from 'util';
import { Types } from 'mongoose';
import { UserType } from './logger.interface';

export class ServerAccessLogger implements LoggerService {
  logFile: WriteStream | null = null;
  filePath = './logs/skeleton-access.log';
  constructor() {
    this._createOrPrepareActionFile();
  }

  error(_: any, __: string = 'ERROR') {}
  log(_: any, __: string = 'LOG') {}
  warn(_: any, __ = 'WARN') {}

  accessLog(
    email: string,
    userType: UserType,
    userID: Types.ObjectId,
    message: 'LOGGED IN' | 'LOGGED OUT',
  ) {
    this._logAction(
      this._formatMessageForLogFile(email, userID, message, userType),
    );
  }

  private _logAction(message: string) {
    this.logFile?.write(format('', message) + '\n');
  }

  private _formatMessageForLogFile(
    email: string,
    userID: Types.ObjectId,
    message: 'LOGGED IN' | 'LOGGED OUT',
    userType: UserType,
  ) {
    return `[${userType}] ${email} - [ID] ${userID} - [ON] ${this._getDate()} - [LOG] ${message}`;
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
