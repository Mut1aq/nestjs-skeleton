import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { EventsModule } from './events/events.module';
import { SystemUsersModule } from './system-users/system-users.module';
import { MapsModule } from './maps/maps.module';

@Module({
  imports: [AuthModule, SystemUsersModule, EventsModule, MapsModule],
  exports: [AuthModule, SystemUsersModule],
})
export class ModulesModule {}
