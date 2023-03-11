import { BullModule } from '@nestjs/bull';
import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
  CacheModule,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { ScheduleModule } from '@nestjs/schedule';
import { ThrottlerModule } from '@nestjs/throttler';
import helmet from 'helmet';
import { I18nModule } from 'nestjs-i18n';
import { EventsModule } from './modules/events/events.module';
import { ModulesModule } from './modules/modules.module';
import { ServicesModule } from './services/services.module';
import {
  ConfigOptions,
  ThrottlerOptions,
  I18nModuleOptions,
} from './shared/configs/app-options';
import {
  GlobalGuards,
  GlobalFilters,
  GlobalInterceptors,
  MongooseConfig,
  GlobalServices,
  BullConfig,
  RedisConfig,
} from './shared/configs/app-configs';
import { DecoratorsModule } from './shared/decorators/decorators.module';
import { DevtoolsModule } from '@nestjs/devtools-integration';

@Module({
  imports: [
    ConfigModule.forRoot(ConfigOptions),
    MongooseModule.forRootAsync(MongooseConfig),
    ThrottlerModule.forRoot(ThrottlerOptions),
    I18nModule.forRoot(I18nModuleOptions),
    CacheModule.registerAsync<any>(RedisConfig),
    BullModule.forRootAsync(BullConfig),
    ScheduleModule.forRoot(),
    DevtoolsModule.register({
      http: process.env.NODE_ENV !== 'production',
    }),
    ServicesModule,
    DecoratorsModule,
    PassportModule,
    EventsModule,
    ModulesModule,
  ],
  controllers: [],
  providers: [
    ...GlobalGuards,
    ...GlobalFilters,
    ...GlobalInterceptors,
    ...GlobalServices,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(helmet()).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
