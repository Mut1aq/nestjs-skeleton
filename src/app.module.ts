import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { I18nModule } from 'nestjs-i18n';
import { ServicesModule } from './services/services.module';
import { PassportModule } from '@nestjs/passport';
import { DecoratorsModule } from './shared/decorators/decorators.module';
import { ModulesModule } from './modules/modules.module';
import {
  GlobalGuards,
  GlobalFilters,
  GlobalInterceptors,
  GlobalServices,
} from './shared/configs/app.configs';
import { I18nOptions, ThrottlerOptions } from './shared/configs/app-options';
import { ThrottlerModule } from '@nestjs/throttler';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGODB_URL),
    ThrottlerModule.forRoot(ThrottlerOptions),
    I18nModule.forRoot(I18nOptions),
    ServicesModule,
    DecoratorsModule,
    PassportModule,
    ModulesModule,
  ],
  controllers: [AppController],
  providers: [
    ...GlobalServices,
    ...GlobalGuards,
    ...GlobalFilters,
    ...GlobalInterceptors,
  ],
})
export class AppModule {}
