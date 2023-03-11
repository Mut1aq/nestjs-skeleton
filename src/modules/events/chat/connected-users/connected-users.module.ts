import { Module } from '@nestjs/common';
import { ConnectedUsersService } from './connected-users.service';
import { ConnectedUsersController } from './connected-users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ConnectedUser,
  ConnectedUserSchema,
} from './entities/connected-user.entity';

@Module({
  controllers: [ConnectedUsersController],
  providers: [ConnectedUsersService],
  imports: [
    MongooseModule.forFeature([
      { name: ConnectedUser.name, schema: ConnectedUserSchema },
    ]),
  ],
  exports: [ConnectedUsersService],
})
export class ConnectedUsersModule {}
