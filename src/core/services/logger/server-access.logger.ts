import { LoggerService } from '@nestjs/common';
import { createWriteStream, existsSync, mkdirSync, WriteStream } from 'fs';
import { format } from 'util';
import { UserType } from './logger-helpers.interface';

export class ServerAccessLogger implements LoggerService {
  logFile: WriteStream | null = null;
  filePath = './logs/eve-access.log';
  constructor() {
    this._createOrPrepareActionFile();
  }

  debug(_: any, __: string = 'DEBUG') {}
  error(_: any, __: string = 'ERROR') {}
  log(_: any, __: string = 'LOG') {}
  verbose(_: any, __ = 'VERBOSE') {}
  warn(_: any, __ = 'WARN') {}

  accessLog(
    email: string,
    userType: UserType,
    userID: string,
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
    userID: string,
    message: 'LOGGED IN' | 'LOGGED OUT',
    userType: 'ADMIN' | 'SERVICE PROVIDER' | 'DEFAULT' | 'DOCTOR',
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
