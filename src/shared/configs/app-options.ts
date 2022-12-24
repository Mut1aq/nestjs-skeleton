import { SwaggerDocumentOptions } from '@nestjs/swagger';
import {
  QueryResolver,
  HeaderResolver,
  AcceptLanguageResolver,
  CookieResolver,
} from 'nestjs-i18n';
import { join } from 'path';

export const I18nOptions = {
  fallbackLanguage: 'en',
  loaderOptions: {
    path: join(__dirname, '../../i18n'),
    watch: true,
  },
  typesOutputPath: join(__dirname, '../../../src/generated/i18n.generated.ts'),
  resolvers: [
    { use: QueryResolver, options: ['lang', 'locale', 'l'] },
    new HeaderResolver(['x-custom-lang']),
    AcceptLanguageResolver,
    new CookieResolver(['lang', 'locale', 'l']),
  ],
};

export const ThrottlerOptions = {
  ttl: 60,
  limit: 10,
};

export const SwaggerOptions: SwaggerDocumentOptions = {
  operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
};
