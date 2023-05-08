import { CustomExceptionFilter } from '@filters/custom-exception.filter';
import { AccessTokenGuard } from '@guards/access-token.guard';
import { CustomThrottlerGuard } from '@guards/custom-throttler.guard';
import { RoleGuard } from '@guards/role.guard';
import { TranslationInterceptor } from '@interceptors/translation.interceptor';
import { APP_GUARD, APP_INTERCEPTOR, APP_FILTER } from '@nestjs/core';

export const GlobalAccessTokenGuard = {
  provide: APP_GUARD,
  useClass: AccessTokenGuard,
};

export const GlobalCustomExceptionInterceptor = {
  provide: APP_INTERCEPTOR,
  useClass: TranslationInterceptor,
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

export const GlobalInterceptors = [GlobalCustomExceptionInterceptor];

export const GlobalFilters = [GlobalCustomExceptionFilter];

export const GlobalServices = [];

export const GlobalGuards = [
  GlobalThrottlerGuard,
  GlobalAccessTokenGuard,
  GlobalRoleGuard,
];
