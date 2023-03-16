import { LoggerService } from '@nestjs/common';
import { createWriteStream, existsSync, mkdirSync, WriteStream } from 'fs';
import { format } from 'util';
import { ColorScheme } from 'src/shared/interfaces/general/color-scheme.interface';
import {
  APIColorScheme,
  ErrorColorScheme,
  LogColorScheme,
  WarnColorScheme,
} from '../../shared/constants/general/pallet';

export class ServerAPILogger implements LoggerService {
  logFile: WriteStream | null = null;
  filePath = './logs/skeleton-api.log';
  constructor() {
    if (!existsSync('./logs')) {
      mkdirSync('./logs');
    }
    if (!existsSync(this.filePath)) {
      createWriteStream(this.filePath, { flags: 'a' });
    }
    if (!this.logFile)
      this.logFile = createWriteStream(this.filePath, { flags: 'a' }); // a for append/ w for write
  }

  error(message: any, context: string = 'ERROR') {
    this.basicLog(message, context, 'ERROR', ErrorColorScheme);
  }

  log(message: any, context: string = 'LOG') {
    this.basicLog(message, context, 'LOG', LogColorScheme);
  }

  warn(message: any, context = 'WARN') {
    this.basicLog(message, context, 'WARN', WarnColorScheme);
  }

  basicLog(
    message: any,
    context: string,
    type: string | number,
    colorScheme: ColorScheme,
  ) {
    const { messageColor, contextColor } = colorScheme;
    const customMessage = `${messageColor}[Your Parts] ${
      process.pid
    }  - \x1B[39m${this._getDate()}     ${messageColor}${type}\x1B[39m ${contextColor}[${context}]\x1B[39m ${messageColor}${message}\x1B[39m`;
    console.log(customMessage);
  }

  APIlog(
    message: string,
    context: any = 'API',
    reqInfo: any,
    statusCode: number,
    error: string | null = null,
  ) {
    const scheme = error ? ErrorColorScheme : APIColorScheme;
    const colorScheme: ColorScheme = {
      ...scheme,
    };

    this.basicLog(message, context, statusCode, colorScheme);
    this._logAPI(this._formatMessageForLogFile(reqInfo, statusCode));
  }

  private _logAPI(message: string) {
    // writing to file; A stands for apple
    this.logFile?.write(format('', message) + '\n');
  }

  private _formatMessageForLogFile(req: any, statusCode = 500) {
    const { hostname, method, headers, originalUrl, ip } = req;

    return `[HOST] ${hostname} - ${this._getDate()} [STATUS] ${statusCode} - [METHOD] ${method} - [URL] ${originalUrl} - [IP] ${ip} - [USER-AGENT] ${
      headers['user-agent']
    } - [LANGUAGE] ${headers['accept-language']}`;
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
}
