import { forwardRef, Module } from '@nestjs/common';
import { AdsService } from './ads.service';
import { AdsController } from './ads.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Ad, AdSchema } from './entities/ad.entity';
import { TaskSchedulingModule } from '@services/task-scheduling/task-scheduling.module';
import { FileUploadModule } from '@services/file-upload/file-upload.module';

@Module({
  controllers: [AdsController],
  providers: [AdsService],
  imports: [
    MongooseModule.forFeature([{ name: Ad.name, schema: AdSchema }]),
    forwardRef(() => TaskSchedulingModule),
    FileUploadModule,
  ],
  exports: [AdsService],
})
export class AdsModule {}
