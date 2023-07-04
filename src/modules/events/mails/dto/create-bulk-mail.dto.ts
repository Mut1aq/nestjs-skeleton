import { StringValidator } from '@decorators/data-types/string-validator.decorator';
import { EmailSendOptions } from '@shared/enums/email-send-options.enum';
import { IsEnum, IsIn, IsInt, IsNotEmpty, IsString } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class CreateBulkMailDto {
  @IsEnum(EmailSendOptions)
  @IsInt({
    message: i18nValidationMessage('validation.isInt', {
      property: 'Email Send Options',
    }),
  })
  @IsNotEmpty({
    message: i18nValidationMessage('validation.isNotEmpty', {
      property: 'Email Send Options',
    }),
  })
  readonly emailSendOptions!: EmailSendOptions;

  @StringValidator({
    maxLength: 998,
    minLength: 0,
    name: 'subject',
    property: 'Subject',
    isNotEmpty: true,
    each: false,
  })
  subject!: string;

  @StringValidator({
    maxLength: 384000,
    minLength: 0,
    name: 'body',
    property: 'Body',
    isNotEmpty: true,
    each: false,
  })
  body!: string;

  @IsIn(['high', 'normal', 'low'])
  @IsString({
    message: i18nValidationMessage('validation.isString', {
      property: 'Priority',
    }),
  })
  @IsNotEmpty({
    message: i18nValidationMessage('validation.isNotEmpty', {
      property: 'Priority',
    }),
  })
  priority!: 'high' | 'normal' | 'low';
}
