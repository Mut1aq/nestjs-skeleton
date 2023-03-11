import { Module } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { AdminController } from './admins.controller';
import { adminMongooseFeature } from './entities/admin.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [AdminController],
  providers: [AdminsService, JwtService],
  imports: [MongooseModule.forFeature([adminMongooseFeature])],
  exports: [AdminsService],
})
export class AdminsModule {}
