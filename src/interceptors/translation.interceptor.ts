import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { map, Observable } from 'rxjs';
import { ServerLogger } from 'src/services/logger/server-logger';

@Injectable()
export class TranslationInterceptor implements NestInterceptor {
  constructor(private i18n: I18nService, private logger: ServerLogger) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const lang = request.headers['accept-language'];
    const response = context.switchToHttp().getResponse();
    this.logger.APIlog(
      request.originalUrl,
      'TranslationInterceptor - Request',
      request,
      42069, // ! Nice
    );
    return next.handle().pipe(
      map(async (data) => {
        this.logger.APIlog(
          request.originalUrl,
          'TranslationInterceptor - Response',
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
              'TranslationInterceptor',
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
