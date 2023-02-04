import {
  Module,
  CacheModule,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { ScheduleModule } from '@nestjs/schedule';
import { ThrottlerModule } from '@nestjs/throttler';
import helmet from 'helmet';
import { I18nModule } from 'nestjs-i18n';
import { ModulesModule } from './modules/modules.module';
import { ServicesModule } from './services/services.module';
import {
  ConfigOptions,
  ThrottlerOptions,
  I18nOptions,
} from './shared/configs/app-options';
import {
  GlobalGuards,
  GlobalFilters,
  GlobalInterceptors,
  MongooseConfig,
  CacheConfig,
  // RedisConfig,
} from './shared/configs/app.configs';
import { DecoratorsModule } from './shared/decorators/decorators.module';

@Module({
  imports: [
    ConfigModule.forRoot(ConfigOptions),
    MongooseModule.forRootAsync(MongooseConfig),
    ThrottlerModule.forRoot(ThrottlerOptions),
    I18nModule.forRoot(I18nOptions),
    ServicesModule,
    DecoratorsModule,
    PassportModule,
    // DatabaseHooksModule,
    ScheduleModule.forRoot(),
    // CacheModule.registerAsync(RedisConfig),
    CacheModule.register(CacheConfig),
    ModulesModule,
  ],
  controllers: [],
  providers: [...GlobalGuards, ...GlobalFilters, ...GlobalInterceptors],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(helmet()).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
