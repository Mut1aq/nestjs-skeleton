import { Module } from '@nestjs/common';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { FileUploadService } from './file-upload.service';

@Module({
  providers: [FileUploadService],
  exports: [FileUploadService],
  imports: [CloudinaryModule],
})
export class FileUploadModule {}
