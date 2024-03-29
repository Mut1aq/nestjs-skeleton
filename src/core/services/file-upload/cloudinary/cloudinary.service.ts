import { Injectable } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';
import toStream = require('buffer-to-stream');
import { error } from 'console';
import { UploadOptions } from '../interfaces/upload-options';
import {
  validImageFormats,
  validVideoFormats,
} from '@shared/constants/validation/validation-constants';
import { CloudinaryObject } from '@shared/interfaces/general/cloudinary-object.interface';

@Injectable()
export class CloudinaryService {
  constructor() {}
  async uploadFile(
    file: Express.Multer.File,
    uploadOptions: UploadOptions,
  ): Promise<CloudinaryObject> {
    const uploadedFile: UploadApiResponse | undefined = await new Promise(
      (resolve, reject) => {
        const upload = v2.uploader.upload_stream(
          {
            backup: true,
            folder: uploadOptions.folder,
            allowed_formats:
              uploadOptions.allowedFormats === 'image'
                ? validImageFormats
                : validVideoFormats,
            resource_type: uploadOptions.resourceType,
            tags: uploadOptions.tags,
            use_filename: true,
          },
          (err?: UploadApiErrorResponse, callResult?: UploadApiResponse) => {
            if (err) return reject(error);
            resolve(callResult);
          },
        );

        toStream(file.buffer).pipe(upload);
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
