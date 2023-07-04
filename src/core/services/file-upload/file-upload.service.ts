import { Injectable } from '@nestjs/common';
import { CloudinaryObject } from '@shared/interfaces/general/cloudinary-object.interface';
import { CloudinaryService } from './cloudinary/cloudinary.service';
import { UploadOptions } from './interfaces/upload-options';

@Injectable()
export class FileUploadService {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  destroyResource(publicID: string): Promise<void> {
    return this.cloudinaryService.destroyCloudinaryResource(publicID);
  }

  uploadFile(
    file: Express.Multer.File,
    uploadOptions: UploadOptions,
  ): Promise<CloudinaryObject> {
    return this.cloudinaryService.uploadFile(file, uploadOptions);
  }
}
