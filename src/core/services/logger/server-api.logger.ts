import { LoggerService } from '@nestjs/common';
import { createWriteStream, existsSync, mkdirSync, WriteStream } from 'fs';
import { format } from 'util';
import { ColorScheme } from '@shared/interfaces/general/color-scheme.interface';
import {
  APIColorScheme,
  DebugColorScheme,
  ErrorColorScheme,
  LogColorScheme,
  VerboseColorScheme,
  WarnColorScheme,
} from '../../../shared/constants/general/pallet';
import { Request } from '@shared/interfaces/api/request.interface';

export class ServerAPILogger implements LoggerService {
  logFile: WriteStream | null = null;
  filePath = './logs/eve-api.log';
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
  debug(message: string, context: string = 'DEBUG') {
    this.basicLog(message, context, 'DEBUG', DebugColorScheme);
  }
  error(message: string, context: string = 'ERROR') {
    this.basicLog(message, context, 'ERROR', ErrorColorScheme);
  }

  log(message: string, context: string = 'LOG') {
    const uselessLogs = [
      'RouterExplorer',
      'I18nService',
      'NestFactory',
      'InstanceLoader',
    ];
    if (!uselessLogs.includes(context))
      this.basicLog(message, context, 'LOG', LogColorScheme);
  }

  verbose(message: any, context = 'VERBOSE') {
    this.basicLog(message, context, 'VERBOSE', VerboseColorScheme); // whatever that means -Talha
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
    const customMessage = `${messageColor}[Eve] ${
      process.pid
    } - \x1B[39m${this._getDate()}     ${messageColor}${type}\x1B[39m ${contextColor}[${context}]\x1B[39m ${messageColor}${message}\x1B[39m`;
    console.log(customMessage);
  }

  APIlog(
    message: string,
    context: any = 'API',
    reqInfo: any,
    statusCode: number | '🚀',
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

  private _formatMessageForLogFile(
    req: Request,
    statusCode: number | '🚀' = 500,
  ) {
    const { hostname, method, headers, originalUrl, userIP } = req;

    return `[HOST] ${hostname} - ${this._getDate()} [STATUS] ${statusCode} - [METHOD] ${method} - [URL] ${originalUrl} - [IP] ${userIP} - [USER-AGENT] ${
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
