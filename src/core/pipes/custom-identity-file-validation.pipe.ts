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

export interface ProcessedFile {
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
  frontIdentity: [ProcessedFile];
  backIdentity: [ProcessedFile];
  sample: [ProcessedFile];
}

export interface ReelsApplicationProcessedFiles {
  frontIdentityToValidate: ProcessedFile;
  backIdentityToValidate: ProcessedFile;
  videoToValidate: ProcessedFile;
}

@Injectable()
export class CustomIdentityFileValidation
  implements
    PipeTransform<PostFiles, ReelsApplicationProcessedFiles | undefined>
{
  transform(files: ValidatedPostFiles | PostFiles, _: ArgumentMetadata) {
    if (!checkObjectNullability(files))
      throw new HttpException(
        'user.errors.reelsApplicationFiles',
        HttpStatus.BAD_REQUEST,
      );

    let { frontIdentity, backIdentity, sample } = files as ValidatedPostFiles;

    const filesAreMissingFrontIdentity = !checkObjectNullability(frontIdentity);

    const filesAreMissingBackIdentity = !checkObjectNullability(backIdentity);

    const filesAreMissingSample = !checkObjectNullability(sample);

    if (filesAreMissingBackIdentity) {
      throw new HttpException(
        'validation.reelsApplication.back',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (filesAreMissingFrontIdentity) {
      throw new HttpException(
        'validation.reelsApplication.front',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (filesAreMissingSample) {
      throw new HttpException(
        'validation.reelsApplication.sample',
        HttpStatus.BAD_REQUEST,
      );
    }

    const frontIdentityToValidate = frontIdentity[0];

    const backIdentityToValidate = backIdentity[0];

    const frontIdentityExtension = frontIdentityToValidate.originalname.slice(
      frontIdentityToValidate.originalname.lastIndexOf('.') + 1,
      frontIdentityToValidate.originalname.length,
    );

    const backIdentityExtension = backIdentityToValidate.originalname.slice(
      backIdentityToValidate.originalname.lastIndexOf('.') + 1,
      backIdentityToValidate.originalname.length,
    );

    const validFrontIdentityExtension = validImageFormats.includes(
      frontIdentityExtension,
    );

    const validBackIdentityExtension = validImageFormats.includes(
      backIdentityExtension,
    );

    if (
      frontIdentityToValidate.size > 8 * 1000000 ||
      backIdentityToValidate.size > 8 * 1000000
    )
      throw new HttpException(
        'validation.files.imageSize',
        HttpStatus.BAD_REQUEST,
      );

    if (!validFrontIdentityExtension || !validBackIdentityExtension)
      throw new HttpException(
        'validation.files.imageType',
        HttpStatus.BAD_REQUEST,
      );

    const videoToValidate = sample[0];
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
    return { videoToValidate, frontIdentityToValidate, backIdentityToValidate };
  }
}
