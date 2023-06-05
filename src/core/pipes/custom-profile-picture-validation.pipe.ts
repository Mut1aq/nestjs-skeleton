import {
  Injectable,
  PipeTransform,
  ArgumentMetadata,
  HttpException,
} from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { validImageFormats } from '@shared/constants/validation/validation-constants';
import { checkObjectNullability } from '@shared/util/check-nullability.util';
import { Readable } from 'stream';

export interface ImageFiles {
  image: Express.Multer.File;
}

export interface ImageProcessedFile {
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

interface ValidatedImageFiles {
  image: [ImageProcessedFile];
}

@Injectable()
export class CustomProfilePictureFileValidation
  implements PipeTransform<ImageFiles, ImageProcessedFile | undefined>
{
  transform(files: ValidatedImageFiles | ImageFiles, _: ArgumentMetadata) {
    if (!checkObjectNullability(files)) return undefined;
    let { image } = files as ValidatedImageFiles;

    if (checkObjectNullability(image)) {
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

    return undefined;
  }
}
