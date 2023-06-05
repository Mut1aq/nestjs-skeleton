import { CustomExceptionFilter } from '@filters/custom-exception.filter';
import { AccessTokenGuard } from '@guards/access-token.guard';
import { CustomThrottlerGuard } from '@guards/custom-throttler.guard';
import { RoleGuard } from '@guards/role.guard';
import { TimeoutInterceptor } from '@interceptors/timeout.interceptor';
import { TranslationInterceptor } from '@interceptors/translation.interceptor';
import { APP_GUARD, APP_INTERCEPTOR, APP_FILTER } from '@nestjs/core';
import { ServerAPILogger } from '@services/logger/server-api.logger';

export const GlobalAccessTokenGuard = {
  provide: APP_GUARD,
  useClass: AccessTokenGuard,
};

export const GlobalTranslationInterceptor = {
  provide: APP_INTERCEPTOR,
  useClass: TranslationInterceptor,
};

export const GlobalTimeoutInterceptor = {
  provide: APP_INTERCEPTOR,
  useClass: TimeoutInterceptor,
};

export const GlobalCustomExceptionFilter = {
  provide: APP_FILTER,
  useClass: CustomExceptionFilter,
};

export const GlobalThrottlerGuard = {
  provide: APP_GUARD,
  useClass: CustomThrottlerGuard,
};

export const GlobalRoleGuard = {
  provide: APP_GUARD,
  useClass: RoleGuard,
};

export const GlobalInterceptors = [
  GlobalTranslationInterceptor,
  GlobalTimeoutInterceptor,
];

export const GlobalFilters = [GlobalCustomExceptionFilter];

export const GlobalServices = [ServerAPILogger];

export const GlobalGuards = [
  GlobalThrottlerGuard,
  GlobalAccessTokenGuard,
  GlobalRoleGuard,
];
