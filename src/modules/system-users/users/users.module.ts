import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { userMongooseFeature } from '../users/entities/user.entity';
import { UsersHelperService } from './services/users-helper.service';
import { UserWSHelperService } from './services/user-ws-helper.service';
import { MailsModule } from '@modules/events/mails/mails.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UsersHelperService, UserWSHelperService],
  imports: [MongooseModule.forFeature([userMongooseFeature]), MailsModule],
  exports: [UsersService, UsersHelperService, UserWSHelperService],
})
export class UsersModule {}
