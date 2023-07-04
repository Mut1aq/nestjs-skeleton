import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ThrottlerModule } from '@nestjs/throttler';
import helmet from 'helmet';
import { I18nModule } from 'nestjs-i18n';
import { ModulesModule } from './modules/modules.module';
import { ServicesModule } from './core/services/services.module';
import {
  ConfigOptions,
  ThrottlerOptions,
  I18nModuleOptions,
  JWTOptions,
  MongooseOptions,
} from './shared/configs/app-options';
import {
  GlobalGuards,
  GlobalFilters,
  GlobalInterceptors,
  GlobalServices,
} from './shared/configs/app-configs';
import { DecoratorsModule } from './core/decorators/decorators.module';
import { JwtModule } from '@nestjs/jwt';
import { CacheModule } from './core/services/cache/cache.module';
import { TaskSchedulingModule } from '@services/task-scheduling/task-scheduling.module';
import { RealIPMiddleware } from '@middlewares/real-ip.middleware';

@Module({
  imports: [
    ConfigModule.forRoot(ConfigOptions),
    MongooseModule.forRootAsync(MongooseOptions),
    I18nModule.forRoot(I18nModuleOptions),
    JwtModule.registerAsync(JWTOptions),
    ThrottlerModule.forRoot(ThrottlerOptions),
    CacheModule,
    TaskSchedulingModule,
    ServicesModule,
    DecoratorsModule,
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
    consumer.apply(helmet(), RealIPMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
