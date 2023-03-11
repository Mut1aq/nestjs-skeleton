import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModuleAsyncOptions } from '@nestjs/mongoose';
import { DocumentBuilder, OpenAPIObject } from '@nestjs/swagger';
import {
  GlobalCustomExceptionInterceptor,
  GlobalCustomExceptionFilter,
  GlobalThrottlerGuard,
  GlobalAccessTokenGuard,
  GlobalRoleGuard,
} from '../constants/general/app-constants';
import { JwtModuleAsyncOptions } from '@nestjs/jwt';
import { ServerAPILogger } from 'src/services/logger/server-api.logger';
import { ServerActionLogger } from 'src/services/logger/server-action.logger';
import { SharedBullAsyncConfiguration } from '@nestjs/bull';
import { redisStore } from 'cache-manager-redis-store';

export const GlobalInterceptors = [GlobalCustomExceptionInterceptor];

export const GlobalFilters = [GlobalCustomExceptionFilter];

export const GlobalServices = [ServerAPILogger, ServerActionLogger];

export const GlobalGuards = [
  GlobalThrottlerGuard,
  GlobalAccessTokenGuard,
  GlobalRoleGuard,
];

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

export const MongooseConfig: MongooseModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => ({
    uri: configService.get<string>('MONGODB_URL'),
  }),
  inject: [ConfigService],
};

export const RedisConfig = {
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

export const BullConfig: SharedBullAsyncConfiguration = {
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

export const JwtConfig: JwtModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => ({
    secret: configService.get<string>('USER_ACCESS_TOKEN_SECRET'),
    signOptions: {
      expiresIn: configService.get<string>('USER_ACCESS_TOKEN_EXPIRES_IN'),
    },
  }),
  inject: [ConfigService],
};
