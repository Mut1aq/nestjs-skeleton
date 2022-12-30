import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { useContainer } from 'class-validator';
import helmet from 'helmet';
import {
  I18nValidationExceptionFilter,
  i18nValidationErrorFactory,
} from 'nestjs-i18n';
import { AppModule } from './app.module';
import { ServerLogger } from './services/logger/server-logger';
import { SwaggerOptions } from './shared/configs/app-options';
import { SwaggerConfig } from './shared/configs/app.configs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: false,
    logger: new ServerLogger(),
  });

  const configService = app.get<ConfigService>(ConfigService);

  app.enableCors();

  app.setGlobalPrefix('api');

  app.useGlobalFilters(
    new I18nValidationExceptionFilter({
      detailedErrors: false,
    }),
  );

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: i18nValidationErrorFactory,
    }),
  );

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  app.use(helmet());

  const document = SwaggerModule.createDocument(
    app,
    SwaggerConfig,
    SwaggerOptions,
  );

  SwaggerModule.setup('api', app, document);

  await app.listen(configService.get('PORT') || 3000);
}
bootstrap();
