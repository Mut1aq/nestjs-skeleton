import { CacheModuleOptions } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModuleAsyncOptions } from '@nestjs/mongoose';
import { DocumentBuilder, OpenAPIObject } from '@nestjs/swagger';
import {
  GlobalCustomExceptionInterceptor,
  GlobalCustomExceptionFilter,
  GlobalThrottlerGuard,
  // GlobalAccessTokenGuard,
} from '../constants/general/app-constants';
import { JwtModuleAsyncOptions } from '@nestjs/jwt';

export const GlobalInterceptors = [GlobalCustomExceptionInterceptor];

export const GlobalFilters = [GlobalCustomExceptionFilter];

export const GlobalGuards = [
  GlobalThrottlerGuard,
  // GlobalAccessTokenGuard
];

export const SwaggerConfig: Omit<OpenAPIObject, 'paths'> = new DocumentBuilder()
  .setTitle('shifacom')
  .setDescription('Medical Project')
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

// export const RedisConfig: CacheModuleAsyncOptions<Record<string, any>> = {
//   imports: [ConfigModule],
//   useFactory: async (configService: ConfigService) => ({
//     isGlobal: true,
//     store: redisStore,
//     no_ready_check: true,
//     host: configService.get<string>('REDIS_HOST'),
//     port: parseInt(configService.get<string>('REDIS_PORT') as string),
//     username: configService.get<string>('REDIS_USERNAME'),
//     password: configService.get<string>('REDIS_PASSWORD'),
//   }),

//   inject: [ConfigService],
// };

export const CacheConfig: CacheModuleOptions<Record<string, any>> = {
  isGlobal: true,
  ttl: 0,
  max: 100,
};

export const JwtConfig: JwtModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => ({
    secret: configService.get<string>('ACCESS_TOKEN_SECRET'),
  }),
  inject: [ConfigService],
};
