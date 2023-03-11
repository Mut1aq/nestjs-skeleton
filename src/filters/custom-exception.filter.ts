import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Injectable,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { I18nService } from 'nestjs-i18n';
import { ServerAPILogger } from 'src/services/logger/server-api.logger';

@Catch(HttpException)
@Injectable()
export class CustomExceptionFilter implements ExceptionFilter {
  constructor(private i18n: I18nService, private APILogger: ServerAPILogger) {}
  async catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const lang = request.headers['accept-language'] || 'en';
    const translatedErrorMessage = !Array.isArray(exception.message)
      ? await this.i18n.translate(exception.message, { lang })
      : exception.message;

    this.APILogger.APIlog(
      request.originalUrl,
      'CustomExceptionFilter',
      request,
      status,
      exception?.message,
    );

    response.status(status).json({
      statusCode: status,
      error: translatedErrorMessage,
      message:
        (exception.getResponse() as any)['message' ?? 'error'] ??
        translatedErrorMessage,
    });
  }
}
