import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PathImpl2 } from '@nestjs/config';
import { checkNullability } from '@shared/util/check-nullability.util';
import { I18nTranslations } from 'generated/i18n.generated';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class DynamicTranslationService {
  constructor(private readonly i18n: I18nService<I18nTranslations>) {}

  async HTTPErrorWithOneArg(
    error: any,
    firstTranslation: PathImpl2<I18nTranslations>,
    secondTranslation: PathImpl2<I18nTranslations>,
  ): Promise<void> {
    throw new HttpException(
      checkNullability(error.message)
        ? error.message
        : this.i18n.translate(firstTranslation, {
            args: {
              entity: this.i18n.translate(secondTranslation),
            },
          }),
      HttpStatus.AMBIGUOUS,
      {
        cause: new Error(error as string),
      },
    );
  }

  async HTTPErrorWithNoArgs(
    error: any,
    firstTranslation: PathImpl2<I18nTranslations>,
  ): Promise<void> {
    throw new HttpException(
      checkNullability(error.message)
        ? error.message
        : this.i18n.translate(firstTranslation),
      HttpStatus.AMBIGUOUS,
      {
        cause: new Error(error as string),
      },
    );
  }
}
