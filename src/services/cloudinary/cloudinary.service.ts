import { Injectable } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';
import toStream = require('buffer-to-stream');
import { error } from 'console';
import {
  validImageFormats,
  validVideoFormats,
} from 'src/shared/constants/validation/validation-constants';
import { ServerAPILogger } from 'src/services/logger/server-api.logger';
@Injectable()
export class CloudinaryService {
  constructor(private readonly APILogger: ServerAPILogger) {}
  async uploadPostImage(
    image: Express.Multer.File,
  ): Promise<{ url: string; publicID: string }> {
    const uploadedFile: UploadApiResponse | undefined = await new Promise(
      (resolve, reject) => {
        const upload = v2.uploader.upload_stream(
          {
            backup: true,
            folder: 'Posts',
            allowed_formats: validImageFormats,
            resource_type: 'image',
            tags: ['image'],
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

  async uploadPostVideo(
    image: Express.Multer.File,
  ): Promise<{ url: string; publicID: string }> {
    const uploadedFile: UploadApiResponse | undefined = await new Promise(
      (resolve, reject) => {
        const upload = v2.uploader.upload_stream(
          {
            backup: true,
            folder: 'Posts',
            allowed_formats: validVideoFormats,
            resource_type: 'video',
            tags: ['video'],
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
  async uploadAdImage(
    image: Express.Multer.File,
  ): Promise<{ url: string; publicID: string }> {
    const uploadedFile: UploadApiResponse | undefined = await new Promise(
      (resolve, reject) => {
        const upload = v2.uploader.upload_stream(
          {
            backup: true,
            folder: 'Ads',
            allowed_formats: validImageFormats,
            resource_type: 'image',
            tags: ['ads'],
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

  async destroyCloudinaryResource(publicID: string): Promise<void> {
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
        ? 'Resource Has been deleted'
        : 'Resource was not found';
    this.APILogger.log(logMessage, 'Cloudinary');
  }
}
