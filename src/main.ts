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
import { SwaggerOptions } from './shared/configs/app-options';
import * as compression from 'compression';
import * as mongoSanitize from 'express-mongo-sanitize';
import * as bodyParser from 'body-parser';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerConfig } from './shared/configs/app-options';
import { ServerAPILogger } from './core/services/logger/server-api.logger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: false,
    logger: new ServerAPILogger(),
    snapshot: true,
  });

  const configService = app.get<ConfigService>(ConfigService);
  const logger = app.get<ServerAPILogger>(ServerAPILogger);
  const globalPrefix = configService.get<string>('PREFIX')!;

  // ======================================================
  // security
  // ======================================================

  app.use(compression());
  app.enable('trust proxy');
  app.set('etag', 'strong');
  app.use(bodyParser.json({ limit: '200mb' }));
  app.use(bodyParser.urlencoded({ limit: '200mb', extended: true }));
  app.use(helmet());
  app.enableCors({
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    maxAge: 3600,
    origin: configService.get('ALLOWED_HOSTS'),
  });

  app.setGlobalPrefix(globalPrefix);

  app.useGlobalFilters(
    new I18nValidationExceptionFilter({
      detailedErrors: false,
    }),
  );

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: i18nValidationErrorFactory,
      whitelist: true,
      transform: true,
      forbidUnknownValues: false,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  app.use(
    mongoSanitize({
      dryRun: true,
      onSanitize: ({ req, key }) => {
        logger.warn(
          `❌ [DryRun] This request[${key}] will be sanitized ${req}`,
        );
      },
    }),
  );

  const document = SwaggerModule.createDocument(
    app,
    SwaggerConfig,
    SwaggerOptions,
  );

  SwaggerModule.setup('api', app, document);

  await app.listen(+configService.get<string>('PORT')! || 3000, () => {
    logger.log(
      `🚀 Application is running on port: ${
        +configService.get<string>('PORT')! || 3000
      }`,
    );
  });
}
bootstrap();

// when you start a new nest project
// production:
//                                                            ,1,
//                               ......                     .ifL1
//                            .;1ttttLLf1,                 ;fffff,
//                           :LCLfttfLLLLL:              ,tffffffi
//                          ,CCCLf11ff1tff;            ,1Lffffffff.
//                          iLttt11ifLLLfft.           :iitffffffLi
//                          ;t1111ii1fffff1               ffffft;i1.
//                          ,1iiiiii1tt1it,              ifffff,
//                           ;1i;;;;i1tff:              .fffff1
//                           ,t1ii;:::;i;               ifffff,
//                          .,;11iii;:                 .fffff1
//                     ..,,.,,.,iftitGi...             ifffff,
//                 .,,,::::,,,,..;LLLGt::::,,,.       .fffff1
//                 ;,,,,,,,,,,,,,.,;tfi,::,,::::,     ;fffff,
//                 ::,,,,,,,,..,:,,.:ft,::,,:,,::.   .fffff1
//                 ,i:,,,,,,,,..,,,,,,;,:::,:,,,::   ;fffff,
//                 .1:,,,,,,,,..,,,:,,,::,,,:,,,,:, .fffff1
//                  ;;:,,,,,:, ..,,,::,,,:,,:,,,,::.,1tfff:
//                  ,1;:,,,,;f:.,,,,,,:,..,,:,..,,::,  ..,
//                   ;i::,,,,,:,,:,,:,:::,,,;1:,.,,,:,
//                   .;;;:,,,,,,,,,::::::::::LGC;,,,,:.
//                    .;;:,,.,,,,,,,,,,,,,,:::;;:,,,,,:
//                     ,:::,.....,,,,,,,,,,,:,,,,,,,,,:.
//                     ....,....,,,,,,.....,,,,,,,,,,,,.
//                     ,,..     .,::;:........,,,,,...
//                     :,,......      ............
//                     :,...........   ....:,...,.
//                     ,,............. ...,1;,,,,.
//                                         ..
