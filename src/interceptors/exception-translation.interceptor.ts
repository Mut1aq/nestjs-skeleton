import {
  ArgumentsHost,
  CallHandler,
  Catch,
  ExceptionFilter,
  ExecutionContext,
  HttpException,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { I18nService } from 'nestjs-i18n';
import { map, Observable } from 'rxjs';
import { ServerLogger } from 'src/services/logger/server-logger';

@Catch(HttpException)
@Injectable()
export class CustomExceptionInterceptor
  implements ExceptionFilter, NestInterceptor
{
  constructor(private i18n: I18nService, private logger: ServerLogger) {}
  async catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const lang = request.headers['accept-language'] || 'en';
    const translatedErrorMessage = !Array.isArray(exception.message)
      ? await this.i18n.translate(exception.message, { lang })
      : exception.message;

    this.logger.APIlog(
      request.originalUrl,
      'CustomExceptionInterceptor',
      request,
      status,
      exception.message,
    );

    response.status(status).json({
      statusCode: status,
      error: translatedErrorMessage,
      message:
        exception.getResponse()['message' ?? 'error'] ?? translatedErrorMessage,
    });
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const lang = request.headers['accept-language'];
    const response = context.switchToHttp().getResponse();
    this.logger.APIlog(
      request.originalUrl,
      'CustomExceptionInterceptor - Request',
      request,
      42069, // ! Nice
    );
    return next.handle().pipe(
      map(async (data) => {
        this.logger.APIlog(
          request.originalUrl,
          'CustomExceptionInterceptor - Response',
          request,
          response.statusCode,
        );
        if (data && (data.message || data.error)) {
          let customMessage = '';
          try {
            customMessage = await this.i18n.translate(
              data.message ?? data.error,
              { lang },
            );
          } catch (err) {
            customMessage = data.message ?? data.error;
            this.logger.APIlog(
              request.originalUrl,
              'CustomExceptionInterceptor',
              request,
              response.statusCode,
              customMessage,
            );
          }
          return { ...data, message: customMessage };
        } else return data;
      }),
    );
  }
}
