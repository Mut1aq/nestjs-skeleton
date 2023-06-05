import {
  Injectable,
  PipeTransform,
  ArgumentMetadata,
  HttpException,
} from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { Readable } from 'stream';
import {
  validImageFormats,
  validVideoFormats,
} from '../../shared/constants/validation/validation-constants';
import { checkObjectNullability } from '../../shared/util/check-nullability.util';

export interface PostFiles {
  image: Express.Multer.File;
  video: Express.Multer.File;
}

export interface PostProcessedFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  stream: Readable;
  destination: string;
  filename: string;
  path: string;
  buffer: Buffer;
}

interface ValidatedPostFiles {
  image: [PostProcessedFile];
  video: [PostProcessedFile];
}

@Injectable()
export class CustomPostFilesValidation
  implements PipeTransform<PostFiles, PostProcessedFile | undefined>
{
  transform(files: ValidatedPostFiles | PostFiles, _: ArgumentMetadata) {
    if (!checkObjectNullability(files)) return undefined;
    let { image, video } = files as ValidatedPostFiles;

    const fileContainsOnlyAnImage =
      checkObjectNullability(image) && !checkObjectNullability(video);
    const fileContainsOnlyAVideo =
      !checkObjectNullability(image) && checkObjectNullability(video);

    if (fileContainsOnlyAnImage) {
      const imageToValidate = image[0];
      const imageExtension = imageToValidate.originalname.slice(
        imageToValidate.originalname.lastIndexOf('.') + 1,
        imageToValidate.originalname.length,
      );
      const validImageExtension = validImageFormats.includes(imageExtension);

      if (imageToValidate.size > 8 * 1000000)
        throw new HttpException(
          'validation.files.imageSize',
          HttpStatus.BAD_REQUEST,
        );

      if (!validImageExtension)
        throw new HttpException(
          'validation.files.imageType',
          HttpStatus.BAD_REQUEST,
        );
      return imageToValidate;
    }
    if (fileContainsOnlyAVideo) {
      const videoToValidate = video[0];
      const videoExtension = videoToValidate.originalname.slice(
        videoToValidate.originalname.lastIndexOf('.') + 1,
        videoToValidate.originalname.length,
      );
      const validVideoExtension = validVideoFormats.includes(videoExtension);

      if (videoToValidate.size > 250 * 1000000)
        throw new HttpException(
          'Value must be greater ten.',
          HttpStatus.BAD_REQUEST,
        );

      if (!validVideoExtension)
        throw new HttpException(
          'validation.files.videoType',
          HttpStatus.BAD_REQUEST,
        );
      return videoToValidate;
    }
    return undefined;
  }
}
