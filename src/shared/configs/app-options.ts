import { ConfigModuleOptions } from '@nestjs/config';
import { SwaggerDocumentOptions } from '@nestjs/swagger';
import * as Joi from 'joi';
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
  limit: 30,
};

export const SwaggerOptions: SwaggerDocumentOptions = {
  operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
};

export const ConfigOptions: ConfigModuleOptions = {
  envFilePath: `.development.env`,
  validationSchema: Joi.object({
    NODE_ENV: Joi.string()
      .valid('development', 'production')
      .default('development'),
    PORT: Joi.number().default(3000).required(),
    MONGODB_URL: Joi.string().required(),
    ACCESS_TOKEN_SECRET: Joi.string().required(),
    ACCESS_TOKEN_EXPIRES_IN: Joi.string().required(),
    CLOUDINARY_CLOUD_NAME: Joi.string().required(),
    CLOUDINARY_API_KEY: Joi.number().required(),
    CLOUDINARY_API_SECRET: Joi.string().required(),
  }),
  expandVariables: true,
  cache: true,
  isGlobal: true,
};
