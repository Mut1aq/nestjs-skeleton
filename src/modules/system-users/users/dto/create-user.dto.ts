import { UniqueUserProperty } from '@decorators/validation/unique-property.decorator';
import { Username } from '@decorators/validation/username.decorator';
import { ApiProperty } from '@nestjs/swagger';
import { GeneralRegisterDto } from '@shared/dtos/general-register.dto';
import { thirteenYearsAgo } from '@shared/util/date.util';
import { Transform } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumberString,
  IsString,
  MaxDate,
  MaxLength,
  MinLength,
} from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class CreateUserDto extends GeneralRegisterDto {
  @ApiProperty({
    description: `User's username, must not have trilling or leading dots '..'.
     must not contain consecutive dots, and can only contain alphabets, dot, or underscores`,
    type: 'string',
    required: false,
    example: 'mut1aq',
    name: 'username',
    minLength: 3,
    maxLength: 30,
    isArray: false,
  })
  @UniqueUserProperty('username', {
    message: i18nValidationMessage('validation.uniqueUsername'),
  })
  @Transform((param) => param.value.toLowerCase().trim())
  @Username()
  @MinLength(3, {
    message: i18nValidationMessage('validation.minLength', {
      property: 'Username',
      characters: 3,
    }),
  })
  @MaxLength(30, {
    message: i18nValidationMessage('validation.maxLength', {
      property: 'Username',
      characters: 30,
    }),
  })
  @IsString({
    message: i18nValidationMessage('validation.isString', {
      property: 'Username',
    }),
  })
  @IsNotEmpty({
    message: i18nValidationMessage('validation.isNotEmpty', {
      property: 'Username',
    }),
  })
  username!: string;

  @ApiProperty({
    description: "User's birthday",
    type: 'date string',
    required: true,
    example: 'MM/DD/YYYY',
    name: 'birthday',
    minimum: 13,
  })
  @MaxDate(thirteenYearsAgo, {
    message: i18nValidationMessage('validation.maxDate'),
  })
  @Transform(({ value }) => new Date(value))
  @IsNotEmpty({
    message: i18nValidationMessage('validation.isNotEmpty', {
      property: 'Birth Day',
    }),
  })
  birthday!: string;

  //*******************************************/

  @ApiProperty({
    maxLength: 120,
    minLength: 2,
    required: true,
    type: 'string',
    description: "User's First Name",
    isArray: false,
    example: 'Mutlaq Alsadeed',
    name: 'firstName',
  })
  @MinLength(2, {
    message: i18nValidationMessage('validation.minLength', {
      property: 'First Name',
      characters: 2,
    }),
  })
  @MaxLength(120, {
    message: i18nValidationMessage('validation.maxLength', {
      property: 'First Name',
      characters: 120,
    }),
  })
  @IsString({
    message: i18nValidationMessage('validation.isString', {
      property: 'First Name',
    }),
  })
  @IsNotEmpty({
    message: i18nValidationMessage('validation.isNotEmpty', {
      property: 'First Name',
    }),
  })
  readonly firstName!: string;

  //*******************************************/

  @ApiProperty({
    maxLength: 120,
    minLength: 2,
    required: true,
    type: 'string',
    description: "User's Last Name",
    isArray: false,
    example: 'Mutlaq Alsadeed',
    name: 'lastName',
  })
  @MinLength(2, {
    message: i18nValidationMessage('validation.minLength', {
      property: 'Last Name',
      characters: 2,
    }),
  })
  @MaxLength(120, {
    message: i18nValidationMessage('validation.maxLength', {
      property: 'Last Name',
      characters: 120,
    }),
  })
  @IsString({
    message: i18nValidationMessage('validation.isString', {
      property: 'Last Name',
    }),
  })
  @IsNotEmpty({
    message: i18nValidationMessage('validation.isNotEmpty', {
      property: 'Last Name',
    }),
  })
  readonly lastName!: string;

  //*******************************************/

  @ApiProperty({
    maxLength: 15,
    minLength: 7,
    required: true,
    type: 'string',
    description: "User's Phone Number",
    example: '0795367929',
    isArray: false,
    name: 'phoneNumber',
  })
  @UniqueUserProperty('phoneNumber', {
    message: i18nValidationMessage('validation.uniquePhoneNumber'),
  })
  @MinLength(7, {
    message: i18nValidationMessage('validation.minLength', {
      property: 'Phone Number',
      characters: 7,
    }),
  })
  @MaxLength(15, {
    message: i18nValidationMessage('validation.maxLength', {
      property: 'Phone Number',
      characters: 15,
    }),
  })
  @IsNumberString(undefined, {
    message: i18nValidationMessage('validation.phoneNumber'),
  })
  @IsNotEmpty({
    message: i18nValidationMessage('validation.isNotEmpty', {
      property: 'Phone Number',
    }),
  })
  readonly phoneNumber!: string;
}
