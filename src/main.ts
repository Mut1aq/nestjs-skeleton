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
import * as compression from 'compression';
import * as mongoSanitize from 'express-mongo-sanitize';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: false,
    logger: new ServerLogger(),
  });

  const configService = app.get<ConfigService>(ConfigService);
  const logger = app.get<ServerLogger>(ServerLogger);

  app.enableCors();

  app.setGlobalPrefix('api');

  app.use(compression());

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

  app.use(
    mongoSanitize({
      dryRun: true,
      onSanitize: ({ req, key }) => {
        logger.warn(`[DryRun] This request[${key}] will be sanitized ${req}`);
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
      `Server running on port ${+configService.get<string>('PORT')! || 3000}`,
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
