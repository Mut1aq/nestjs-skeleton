import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { SystemUsersModule } from './system-users/system-users.module';
import { MapsModule } from './maps/maps.module';

@Module({
  imports: [AuthModule, SystemUsersModule, MapsModule],
})
export class ModulesModule {}
