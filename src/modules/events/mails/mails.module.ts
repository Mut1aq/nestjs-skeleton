import { forwardRef, Module } from '@nestjs/common';
import { MailsService } from './mails.service';
import { MailsController } from './mails.controller';
import { ServicesModule } from '@services/services.module';
import { UsersModule } from '@modules/system-users/users/users.module';

@Module({
  providers: [MailsService],
  exports: [MailsService],
  controllers: [MailsController],
  imports: [ServicesModule, forwardRef(() => UsersModule)],
})
export class MailsModule {}
