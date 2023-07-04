import { forwardRef, Module } from '@nestjs/common';
import { AdsService } from './ads.service';
import { AdsController } from './ads.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Ad, AdSchema } from './entities/ad.entity';
import { FileUploadModule } from '@services/file-upload/file-upload.module';
import { AdsDeletionModule } from '@services/task-scheduling/ads-deletion/ads-deletion.module';

@Module({
  controllers: [AdsController],
  providers: [AdsService],
  imports: [
    MongooseModule.forFeature([{ name: Ad.name, schema: AdSchema }]),
    forwardRef(() => AdsDeletionModule),
    FileUploadModule,
  ],
  exports: [AdsService],
})
export class AdsModule {}
