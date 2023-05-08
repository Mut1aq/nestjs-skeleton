import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { ThrottlerModule } from '@nestjs/throttler';
import helmet from 'helmet';
import { I18nModule } from 'nestjs-i18n';
import { ModulesModule } from './modules/modules.module';
import {
  ConfigOptions,
  ThrottlerOptions,
  I18nModuleOptions,
  MongooseConfig,
  JwtConfig,
} from './shared/configs/app-options';
import { DecoratorsModule } from './core/decorators/decorators.module';
import { DevtoolsModule } from '@nestjs/devtools-integration';
import {
  GlobalGuards,
  GlobalFilters,
  GlobalInterceptors,
  GlobalServices,
} from './shared/configs/app-configs';
import { RealIPMiddleware } from './core/middlewares/ip.middleware';
import { ServicesModule } from './core/services/services.module';
import { JwtModule } from '@nestjs/jwt';
import { CacheModule } from '@services/cache/cache.module';

@Module({
  imports: [
    ConfigModule.forRoot(ConfigOptions),
    MongooseModule.forRootAsync(MongooseConfig),
    ThrottlerModule.forRoot(ThrottlerOptions),
    I18nModule.forRoot(I18nModuleOptions),
    CacheModule,
    ScheduleModule.forRoot(),
    DevtoolsModule.register({
      http: process.env.NODE_ENV !== 'production',
    }),
    ServicesModule,
    DecoratorsModule,
    ModulesModule,
    JwtModule.registerAsync(JwtConfig),
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
    consumer.apply(helmet(), RealIPMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
