import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { userMongooseFeature } from '../users/entities/user.entity';
import { UsersHelperService } from './users-helper.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UsersHelperService],
  imports: [MongooseModule.forFeature([userMongooseFeature])],
  exports: [UsersService],
})
export class UsersModule {}
