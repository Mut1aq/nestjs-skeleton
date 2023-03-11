import { Module } from '@nestjs/common';
import { AdminsModule } from './admins/admins.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule, AdminsModule],
})
export class SystemUsersModule {}
