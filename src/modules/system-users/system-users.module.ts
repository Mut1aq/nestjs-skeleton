import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [UserModule, AdminModule],
  exports: [UserModule, AdminModule],
})
export class SystemUsersModule {}
