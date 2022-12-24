import { DocumentBuilder } from '@nestjs/swagger';
import { AppService } from 'src/app.service';
import {
  GlobalCustomExceptionInterceptor,
  GlobalCustomExceptionFilter,
  GlobalThrottlerGuard,
  GlobalJwtAuthGuard,
} from './app-constants';

export const GlobalInterceptors = [GlobalCustomExceptionInterceptor];

export const GlobalFilters = [GlobalCustomExceptionFilter];

export const GlobalGuards = [GlobalThrottlerGuard, GlobalJwtAuthGuard];

export const GlobalServices = [AppService];

export const SwaggerConfig = new DocumentBuilder()
  .setTitle('Nestjs Skeleton')
  .setDescription('Feel free to clone and use it!')
  .setVersion('1.0')
  .addBearerAuth(
    {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      name: 'JWT',
      description: 'Enter JWT token',
      in: 'header',
    },
    'JWT-auth',
  )
  .build();
