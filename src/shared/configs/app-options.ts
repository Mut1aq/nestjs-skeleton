import {
  ConfigModule,
  ConfigModuleOptions,
  ConfigService,
} from '@nestjs/config';
import {
  DocumentBuilder,
  OpenAPIObject,
  SwaggerDocumentOptions,
} from '@nestjs/swagger';
import * as Joi from 'joi';
import {
  QueryResolver,
  HeaderResolver,
  AcceptLanguageResolver,
  CookieResolver,
} from 'nestjs-i18n';
import { join } from 'path';
import { I18nOptions } from 'nestjs-i18n';
import { SharedBullAsyncConfiguration } from '@nestjs/bull';
import { JwtModuleAsyncOptions } from '@nestjs/jwt';
import { MongooseModuleAsyncOptions } from '@nestjs/mongoose';
import { redisStore } from 'cache-manager-redis-store';

export const I18nModuleOptions: I18nOptions = {
  fallbackLanguage: 'en',
  loaderOptions: {
    path: join(__dirname, '../../i18n'),
    watch: true,
  },
  typesOutputPath: join(process.cwd() + '/src/generated/i18n.generated.ts'),
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
  operationIdFactory: (_: string, methodKey: string) => methodKey,
};

export const ConfigOptions: ConfigModuleOptions = {
  isGlobal: true,
  envFilePath: `.development.env`,
  validationSchema: Joi.object({
    NODE_ENV: Joi.string()
      .valid('development', 'production')
      .default('development'),
    PORT: Joi.number().default(3000).required(),
    MONGODB_URL: Joi.string().required(),
    USER_ACCESS_TOKEN_SECRET: Joi.string().required(),
    USER_ACCESS_TOKEN_EXPIRES_IN: Joi.string().required(),
    CLOUDINARY_CLOUD_NAME: Joi.string().required(),
    CLOUDINARY_API_KEY: Joi.number().required(),
    CLOUDINARY_API_SECRET: Joi.string().required(),
    LIMIT_SIZE: Joi.number().required(),
    SALT_ROUNDS: Joi.number().required(),
    TS_NODE_TRANSPILE_ONLY: Joi.boolean().default(true).required(),
  }),
  expandVariables: true,
  cache: true,
};

export const SwaggerConfig: Omit<OpenAPIObject, 'paths'> = new DocumentBuilder()
  .setTitle('NestJS Skeleton')
  .setDescription('Greatest Skeleton in existence')
  .setVersion('1.0')
  .addBearerAuth(
    {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      name: 'JWT',
      description: 'Enter JWT token',
      in: 'header',
    },
    'JWT-auth',
  )
  .build();

export const MongooseOptions: MongooseModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => ({
    uri: configService.get<string>('MONGODB_URL'),
  }),
  inject: [ConfigService],
};

export const RedisOptions = {
  isGlobal: true,
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => {
    const store = await redisStore({
      socket: {
        host: configService.get<string>('REDIS_HOST'),
        port: parseInt(configService.get<string>('REDIS_PORT')!),
      },
    });
    return {
      store: () => store,
    };
  },
  inject: [ConfigService],
};

export const BullOptions: SharedBullAsyncConfiguration = {
  imports: [ConfigModule],
  useFactory: (configService: ConfigService) => ({
    redis: {
      host: configService.get('REDISHOST'),
      port: +configService.get('REDISPORT'),
      maxLoadingRetryTime: 3,
      maxRetriesPerRequest: 3,
    },
  }),
  inject: [ConfigService],
};

export const JwtOptions: JwtModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => ({
    secret: configService.get<string>('USER_ACCESS_TOKEN_SECRET'),
    signOptions: {
      expiresIn: configService.get<string>('USER_ACCESS_TOKEN_EXPIRES_IN'),
    },
  }),
  inject: [ConfigService],
};
