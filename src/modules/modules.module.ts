import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { SystemUsersModule } from './system-users/system-users.module';
import { MapsModule } from './maps/maps.module';
import { AdsModule } from './ads/ads.module';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [AuthModule, SystemUsersModule, MapsModule, AdsModule, ChatModule],
})
export class ModulesModule {}
