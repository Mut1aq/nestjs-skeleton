import {
  GlobalCustomExceptionInterceptor,
  GlobalCustomExceptionFilter,
  GlobalThrottlerGuard,
  GlobalAccessTokenGuard,
  GlobalRoleGuard,
} from '../constants/general/app-constants';

export const GlobalInterceptors = [GlobalCustomExceptionInterceptor];

export const GlobalFilters = [GlobalCustomExceptionFilter];

export const GlobalServices = [];

export const GlobalGuards = [
  GlobalThrottlerGuard,
  GlobalAccessTokenGuard,
  GlobalRoleGuard,
];
