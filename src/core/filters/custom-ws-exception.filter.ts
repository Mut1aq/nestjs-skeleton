import { Catch, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { PathImpl2 } from '@nestjs/config';
import { BaseWsExceptionFilter } from '@nestjs/websockets';
import { I18nService } from 'nestjs-i18n';
import { Socket } from '@modules/chat/interfaces/socket.interface';
import { checkNullability } from '@shared/util/check-nullability.util';
import { I18nTranslations } from 'generated/i18n.generated';

@Catch()
export class CustomWSExceptionsFilter extends BaseWsExceptionFilter {
  constructor(private i18n: I18nService) {
    super();
  }
  async catch(exception: WSException, host: ArgumentsHost) {
    const ctx = host.switchToWs();
    const client = ctx.getClient<Socket>();

    const errorMessages = exception?.response?.message || [exception.message];
    const translatedErrors = [];

    for (const errorMessage of errorMessages) {
      const splitErrorMessage = errorMessage.split('|');
      const translationPath = splitErrorMessage.shift();

      const translationProp = checkNullability(splitErrorMessage)
        ? JSON.parse(splitErrorMessage as unknown as string)
        : {};
      translatedErrors.push(
        this.i18n.translate(translationPath as PathImpl2<I18nTranslations>, {
          args: {
            [Object.keys(translationProp)[0]]:
              translationProp[Object.keys(translationProp)[0]],
          },
        }),
      );
    }

    client.send({
      statusCode: exception.status || HttpStatus.BAD_REQUEST,
      errors: translatedErrors,
    });
  }
}

interface WSException {
  message: string;
  name: string;
  options: Object;
  response: WSResponse;
  status: number;
}
interface WSResponse {
  error: string;
  statusCode: number;
  message: string[] | string;
}
