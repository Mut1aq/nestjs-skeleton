import { Module } from '@nestjs/common';
import { ServerAccessLogger } from './server-access.logger';
import { ServerActionLogger } from './server-action.logger';
import { ServerAPILogger } from './server-api.logger';
import { WSActionLogger } from './ws-action.logger';

@Module({
  imports: [],
  controllers: [],
  providers: [
    ServerAPILogger,
    ServerAccessLogger,
    ServerActionLogger,
    WSActionLogger,
  ],
  exports: [
    ServerAPILogger,
    ServerAccessLogger,
    ServerActionLogger,
    WSActionLogger,
  ],
})
export class LoggerModule {}
