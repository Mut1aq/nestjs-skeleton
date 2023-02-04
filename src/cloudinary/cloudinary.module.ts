import { Module } from '@nestjs/common';
import { ServicesModule } from 'src/services/services.module';
import { CloudinaryProvider } from './cloudinary.provider';
import { CloudinaryService } from './cloudinary.service';

@Module({
  providers: [CloudinaryProvider, CloudinaryService],
  exports: [CloudinaryProvider, CloudinaryService],
  imports: [ServicesModule],
})
export class CloudinaryModule {}
