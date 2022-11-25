import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { I18nModule } from 'nestjs-i18n';
import { AuthModule } from './modules/auth/auth.module';

import {
  GlobalCustomExceptionFilter,
  GlobalCustomExceptionInterceptor,
  GlobalJwtAuthGuard,
  GlobalRolesGuard,
  I18nOptions,
} from './shared/config-constants/app.configuration';
import { ServerLogger } from './services/logger/server-logger';
import { ServicesModule } from './services/services.module';
import { PassportModule } from '@nestjs/passport';
import { DecoratorsModule } from './shared/decorators/decorators.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ServicesModule,
    AuthModule,
    DecoratorsModule,
    I18nModule.forRoot(I18nOptions),
    PassportModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    GlobalCustomExceptionFilter,
    GlobalCustomExceptionInterceptor,
    ServerLogger,
    GlobalRolesGuard,
    GlobalJwtAuthGuard,
  ],
})
export class AppModule {}
