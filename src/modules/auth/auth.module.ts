import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtConfig } from 'src/shared/configs/app-configs';
import { AdminsModule } from '../system-users/admins/admins.module';
import { UsersModule } from '../system-users/users/users.module';
import { ServicesModule } from 'src/services/services.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    AdminsModule,
    UsersModule,
    PassportModule,
    ServicesModule,
    JwtModule.registerAsync(JwtConfig),
  ],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
