import { Injectable } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';
import toStream = require('buffer-to-stream');
import { error } from 'console';
import { imageFormats } from 'src/shared/constants/validation/validation-constants';
import { ServerLogger } from 'src/services/logger/server-logger';
@Injectable()
export class CloudinaryService {
  constructor(private readonly logger: ServerLogger) {}
  async uploadCategoryImage(
    image: Express.Multer.File,
  ): Promise<{ url: string; publicID: string }> {
    const uploadedFile: UploadApiResponse | undefined = await new Promise(
      (resolve, reject) => {
        const upload = v2.uploader.upload_stream(
          {
            backup: true,
            folder: 'Categories',
            allowed_formats: imageFormats,
            resource_type: 'image',
            tags: ['categories'],
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
      url: uploadedFile?.secure_url as string,
      publicID: uploadedFile?.public_id as string,
    };
  }
  async destroyCloudinaryImage(publicID: string): Promise<void> {
    const response: UploadApiResponse | undefined = await new Promise(
      (resolve, reject) => {
        return v2.uploader.destroy(
          publicID,
          (err?: UploadApiErrorResponse, callResult?: UploadApiResponse) => {
            if (err) return reject(error);
            resolve(callResult);
          },
        );
      },
    );
    const logMessage =
      response?.result === 'ok'
        ? 'Image Has been deleted'
        : 'Image was not found';
    this.logger.log(logMessage, 'Cloudinary');
  }
}
