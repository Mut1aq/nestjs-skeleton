import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { userMongooseFeature } from '../users/entities/user.entity';
import { ServicesModule } from 'src/services/services.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [MongooseModule.forFeature([userMongooseFeature]), ServicesModule],
  exports: [UsersService],
})
export class UsersModule {}
