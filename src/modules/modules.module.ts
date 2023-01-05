import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { EventsModule } from './events/events.module';
import { SystemUsersModule } from './system-users/system-users.module';

@Module({
  imports: [AuthModule, SystemUsersModule, EventsModule],
  exports: [AuthModule, SystemUsersModule, EventsModule],
})
export class ModulesModule {}
