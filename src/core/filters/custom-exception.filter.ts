import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Injectable,
} from '@nestjs/common';
import { Response } from 'express';
import { I18nService } from 'nestjs-i18n';
import { ServerAPILogger } from '@services/logger/server-api.logger';
import { nonTranslatableErrors } from '@shared/constants/validation/validation-constants';
import { Request } from '@shared/interfaces/api/request.interface';

@Catch(HttpException)
@Injectable()
export class CustomExceptionFilter implements ExceptionFilter {
  constructor(
    private i18n: I18nService,
    private serverAPILogger: ServerAPILogger,
  ) {}
  async catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    const lang = request.headers['accept-language'] || 'en';

    const translatedErrorMessage =
      !Array.isArray(exception.message) &&
      !nonTranslatableErrors.some((nonTranslatableError: string) =>
        exception.message.includes(nonTranslatableError),
      )
        ? await this.i18n.translate(exception.message, { lang })
        : exception.message;

    this.serverAPILogger.APIlog(
      request.originalUrl,
      '❌',
      request,
      status,
      exception?.message,
    );

    response.status(status).json({
      statusCode: status,
      error: translatedErrorMessage,
      message:
        (exception.getResponse() as { message: string })[
          'message' ?? 'error'
        ] ?? translatedErrorMessage,
    });
  }
}
