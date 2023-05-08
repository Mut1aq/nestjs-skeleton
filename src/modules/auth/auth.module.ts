import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { AdminsModule } from '../system-users/admins/admins.module';
import { UsersModule } from '../system-users/users/users.module';
import { JwtService } from '@nestjs/jwt';
import { CacheService } from '@services/cache/cache.service';
import { LoggerModule } from '@services/logger/logger.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtService, CacheService],
  imports: [AdminsModule, UsersModule, PassportModule, LoggerModule],
  exports: [AuthService],
})
export class AuthModule {}
