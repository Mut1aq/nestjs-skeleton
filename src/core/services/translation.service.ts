import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PathImpl2 } from '@nestjs/config';
import { I18nService } from 'nestjs-i18n';
import { checkNullability } from '@shared/util/check-nullability.util';
import { I18nTranslations } from 'generated/i18n.generated';
import { isProduction } from '@shared/constants/general/production.constants';

/**
 * If in production use the passed down errors which is more user friendly, otherwise return the actual error for debugging
 */
@Injectable()
export class TranslationService {
  constructor(private readonly i18n: I18nService<I18nTranslations>) {}

  async HTTPErrorTranslationWithTwoArgs(
    error: any,
    firstTranslation: PathImpl2<I18nTranslations>,
    secondTranslation: PathImpl2<I18nTranslations>,
  ): Promise<void> {
    if (!isProduction) {
      throw new HttpException(
        checkNullability(error.message)
          ? error.message
          : this.i18n.translate(firstTranslation, {
              args: {
                entity: this.i18n.translate(secondTranslation),
              },
            }),
        HttpStatus.BAD_REQUEST,
        {
          cause: new Error(error),
        },
      );
    } else {
      throw new HttpException(
        this.i18n.translate(firstTranslation, {
          args: {
            entity: this.i18n.translate(secondTranslation),
          },
        }),
        HttpStatus.BAD_REQUEST,
        {
          cause: new Error(error),
        },
      );
    }
  }

  async HTTPTranslationWithOneArg(
    error: any,
    firstTranslation: PathImpl2<I18nTranslations>,
    takeOriginalError?: boolean,
  ): Promise<void> {
    if (!isProduction || takeOriginalError) {
      throw new HttpException(
        checkNullability(error.message)
          ? error.message
          : this.i18n.translate(firstTranslation),
        HttpStatus.AMBIGUOUS,
        {
          cause: new Error(error),
        },
      );
    } else {
      throw new HttpException(
        this.i18n.translate(firstTranslation),
        HttpStatus.AMBIGUOUS,
        {
          cause: new Error(error),
        },
      );
    }
  }
}
