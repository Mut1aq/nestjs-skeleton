import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { map, Observable } from 'rxjs';
import { ServerAPILogger } from 'src/services/logger/server-api.logger';
import { ReturnMessage } from 'src/shared/interfaces/api/return-message.interface';
import { checkNullability } from 'src/shared/util/check-nullability.util';

@Injectable()
export class TranslationInterceptor implements NestInterceptor {
  constructor(
    private i18n: I18nService,
    private serverAPILogger: ServerAPILogger,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const lang = request.headers['accept-language'];
    const response = context.switchToHttp().getResponse();
    this.serverAPILogger.APIlog(
      request.originalUrl,
      'TranslationInterceptor - ⏫ ',
      request,
      42069, // ! Nice
    );
    return next.handle().pipe(
      map(async (returnMessage: ReturnMessage & { error: any }) => {
        const isMessageAlreadyTranslated: boolean =
          returnMessage?.message?.startsWith('Successfully') ||
          (returnMessage?.message?.startsWith('Something') &&
            !checkNullability(returnMessage.error));
        this.serverAPILogger.APIlog(
          request.originalUrl,
          'TranslationInterceptor - ⏬ ',
          request,
          response.statusCode,
        );
        if (returnMessage && (returnMessage.message || returnMessage.error)) {
          let customMessage = '';
          try {
            if (isMessageAlreadyTranslated)
              customMessage = returnMessage.message;
            else {
              customMessage = await this.i18n.translate(
                returnMessage.message ?? returnMessage.error,
                { lang },
              );
            }
          } catch (err) {
            customMessage = returnMessage.message ?? returnMessage.error;
            this.serverAPILogger.APIlog(
              request.originalUrl,
              'TranslationInterceptor',
              request,
              response.statusCode,
              customMessage,
            );
          }
          return { ...returnMessage, message: customMessage };
        } else return returnMessage;
      }),
    );
  }
}
