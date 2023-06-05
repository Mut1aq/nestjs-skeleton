import { LoggerService } from '@nestjs/common';
import { createWriteStream, existsSync, mkdirSync, WriteStream } from 'fs';
import { format } from 'util';
import { Types } from 'mongoose';
import { checkNullability } from '@shared/util/check-nullability.util';
import { Action } from './logger.interface';

export class WSActionLogger implements LoggerService {
  logFile: WriteStream | null = null;
  filePath = './logs/eve-ws.log';
  constructor() {
    this._createOrPrepareWSFile();
  }

  debug(_: any, __: string = 'DEBUG') {}
  error(_: any, __: string = 'ERROR') {}
  log(_: any, __: string = 'LOG') {}
  verbose(_: any, __ = 'VERBOSE') {}
  warn(_: any, __ = 'WARN') {}

  actionLog(
    email: string,
    userID: Types.ObjectId,
    action: Action,
    otherUserID?: Types.ObjectId,
  ) {
    this._logAction(
      this._formatMessageForLogFile(email, userID, action, otherUserID),
    );
  }

  private _logAction(message: string) {
    this.logFile?.write(format('', message) + '\n');
  }

  private _formatMessageForLogFile(
    email: string,
    userID: Types.ObjectId,
    action: Action,
    otherUserID?: Types.ObjectId,
  ) {
    const message = `[EMAIL] ${email} - [ID] ${userID} - [ON] ${this._getDate()} - [DID] ${action} ${
      checkNullability(otherUserID) ? '[EMAIL] ' + email + '[ID] ' + userID : ''
    }`;

    return message;
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

  private _createOrPrepareWSFile() {
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
