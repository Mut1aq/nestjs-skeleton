import { LoggerService } from '@nestjs/common';
import { createWriteStream, existsSync, mkdirSync, WriteStream } from 'fs';
import { format } from 'util';
import { ColorScheme } from '@shared/interfaces/general/color-scheme.interface';
import { Request } from '@shared/interfaces/api/request.interface';
import { checkNullability } from '@shared/util/check-nullability.util';
import {
  debugColor,
  errorColor,
  logColor,
  verboseColor,
  warnColor,
  APIColor,
} from '@shared/constants/general/pallet';

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
    this.customLog(message, context, 'DEBUG', debugColor);
  }
  error(message: any, context: string = 'ERROR') {
    this.customLog(
      message,
      checkNullability(context) ? context : 'ERROR',
      'ERROR',
      errorColor,
    );
  }

  log(message: string | number, context: string = 'LOG') {
    const uselessLogs = [
      'RouterExplorer',
      'I18nService',
      'NestFactory',
      'InstanceLoader',
    ];
    if (!uselessLogs.includes(context))
      this.customLog(message, context, 'LOG', logColor);
  }

  verbose(message: string, context = 'VERBOSE') {
    this.customLog(message, context, 'VERBOSE', verboseColor); // whatever that means -Talha
  }
  warn(message: string, context = 'WARN') {
    this.customLog(message, context, 'WARN', warnColor);
  }

  customLog(
    message: string | number,
    context: string,
    type: string | number,
    colorScheme: ColorScheme,
  ) {
    const { messageColor, contextColor } = colorScheme;
    const customMessage = `${messageColor}[Eve] ${
      process.pid
    } - \x1B[39m${this._getDate()}     ${messageColor}${context}\x1B[39m ${contextColor}[${type}]\x1B[39m ${messageColor}${message}\x1B[39m`;
    console.log(customMessage);
  }

  APIlog(
    message: string,
    context: string = 'API',
    req: Request,
    statusCode: number | '🚀',
    error: string | null = null,
  ) {
    const scheme = error ? errorColor : APIColor;
    const colorScheme: ColorScheme = {
      ...scheme,
    };

    this.customLog(message, context, statusCode, colorScheme);
    this._logAPI(this._formatMessageForLogFile(req, statusCode));
  }

  private _logAPI(message: string) {
    this.logFile?.write(format('', message) + '\n');
  }

  private _formatMessageForLogFile(
    req: Request,
    statusCode: number | '🚀' = 500,
  ) {
    const { hostname, method, headers, originalUrl, userIP, user } = req;

    return `[HOST] ${hostname} - ${this._getDate()} [STATUS] ${statusCode} - [METHOD] ${method} - [URL] ${originalUrl} - [IP] ${userIP} - [USER-AGENT] ${
      headers['user-agent']
    } - [LANGUAGE] ${headers['accept-language']} - [ID] ${user?.sub}`;
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
