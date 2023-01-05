import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { I18nModule } from 'nestjs-i18n';
import { ServicesModule } from './services/services.module';
import { PassportModule } from '@nestjs/passport';
import { DecoratorsModule } from './shared/decorators/decorators.module';
import { ModulesModule } from './modules/modules.module';
import {
  GlobalGuards,
  GlobalFilters,
  GlobalInterceptors,
} from './shared/configs/app.configs';
import { I18nOptions, ThrottlerOptions } from './shared/configs/app-options';
import { ThrottlerModule } from '@nestjs/throttler';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGODB_URL as string),
    ThrottlerModule.forRoot(ThrottlerOptions),
    I18nModule.forRoot(I18nOptions),
    ServicesModule,
    DecoratorsModule,
    PassportModule,
    ModulesModule,
  ],
  controllers: [],
  providers: [...GlobalGuards, ...GlobalFilters, ...GlobalInterceptors],
})
export class AppModule {}
