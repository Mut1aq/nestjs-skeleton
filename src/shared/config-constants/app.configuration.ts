import { join } from 'path';
import {
  AcceptLanguageResolver,
  CookieResolver,
  HeaderResolver,
  QueryResolver,
} from 'nestjs-i18n';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
// import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { CustomExceptionInterceptor } from 'src/interceptors/exception-translation.interceptor';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

export const I18nOptions = {
  fallbackLanguage: 'en',
  loaderOptions: {
    path: join(__dirname, '../../i18n'),
    watch: true,
  },
  resolvers: [
    { use: QueryResolver, options: ['lang', 'locale', 'l'] },
    new HeaderResolver(['x-custom-lang']),
    AcceptLanguageResolver,
    new CookieResolver(['lang', 'locale', 'l']),
  ],
};

export const GlobalJwtAuthGuard = {
  provide: APP_GUARD,
  useClass: JwtAuthGuard,
};

export const GlobalRolesGuard = {
  provide: APP_GUARD,
  useClass: RolesGuard,
};

export const GlobalCustomExceptionInterceptor = {
  provide: APP_INTERCEPTOR,
  useClass: CustomExceptionInterceptor,
};

export const GlobalCustomExceptionFilter = {
  provide: APP_FILTER,
  useClass: CustomExceptionInterceptor,
};
