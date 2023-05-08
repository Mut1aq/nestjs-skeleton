import { Injectable } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';
import toStream = require('buffer-to-stream');
import { error } from 'console';
import { UploadOptions } from '../interfaces/upload-options';

@Injectable()
export class CloudinaryService {
  constructor() {}
  async uploadFile(
    image: Express.Multer.File,
    uploadOptions: UploadOptions,
  ): Promise<{ url: string; publicID: string }> {
    const uploadedFile: UploadApiResponse | undefined = await new Promise(
      (resolve, reject) => {
        const upload = v2.uploader.upload_stream(
          {
            backup: true,
            folder: uploadOptions.folder,
            allowed_formats: uploadOptions.allowedFormats,
            resource_type: uploadOptions.resourceType,
            tags: uploadOptions.tags,
          },
          (err?: UploadApiErrorResponse, callResult?: UploadApiResponse) => {
            if (err) return reject(error);
            resolve(callResult);
          },
        );

        toStream(image.buffer).pipe(upload);
      },
    );

    return {
      url: uploadedFile?.secure_url!,
      publicID: uploadedFile?.public_id!,
    };
  }

  async destroyCloudinaryResource(publicID: string): Promise<void> {
    await new Promise((resolve, reject) => {
      return v2.uploader.destroy(
        publicID,
        (err?: UploadApiErrorResponse, callResult?: UploadApiResponse) => {
          if (err) return reject(error);
          resolve(callResult);
        },
      );
    });
  }
}
