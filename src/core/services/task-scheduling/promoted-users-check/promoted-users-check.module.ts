import { UsersModule } from '@modules/system-users/users/users.module';
import { Module } from '@nestjs/common';
import { LoggerModule } from '@services/logger/logger.module';
import { PromotedUsersCheckService } from './promoted-users-check.service';

@Module({
  providers: [PromotedUsersCheckService],
  imports: [LoggerModule, UsersModule],
})
export class PromotedUsersCheckModule {}
