import { Injectable } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class DynamicTranslationService {
  constructor(private readonly i18n: I18nService) {}

  async passwordTranslation(
    constraint: string,
    property: string,
  ): Promise<string> {
    constraint = await this.i18n.translate(
      'shared.dtos.constraint.' + constraint,
    );
    property = await this.i18n.translate('shared.dtos.property.' + property);

    const message = await this.i18n.translate('auth.validation.contains', {
      args: {
        property,
        constraint,
      },
    });

    return message;
  }
}
