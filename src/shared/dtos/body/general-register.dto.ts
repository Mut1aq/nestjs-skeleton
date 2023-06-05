import { PasswordContainsLowercaseLetter } from '@decorators/password/lowercase-letters.decorator';
import { PasswordContainsNumbers } from '@decorators/password/numbers.decorator';
import { PasswordContainsSpecialCharacter } from '@decorators/password/special-characters.decorator';
import { PasswordContainsUppercaseLetter } from '@decorators/password/uppercase-letters.decorator';
import { Match } from '@decorators/validation/match.decorator';
import { UniqueUserProperty } from '@decorators/validation/unique-property.decorator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  Allow,
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class GeneralRegisterDto {
  //*******************************************/

  @ApiProperty({
    description: "User's Email when registering",
    example: 'mutlaqalsadeed@gmail.com',
    name: 'email',
    required: true,
    uniqueItems: true,
    minLength: 3,
    maxLength: 737106,
    isArray: false,
    type: String,
  })
  @UniqueUserProperty('email', {
    message: i18nValidationMessage('validation.uniqueEmail'),
  })
  @Transform((param) => param?.value?.toLowerCase()?.trim())
  @IsEmail(undefined, {
    message: i18nValidationMessage('validation.email'),
  })
  @MinLength(3, {
    message: i18nValidationMessage('validation.minLength', {
      property: 'Email',
      characters: 3,
    }),
  })
  @MaxLength(737106, {
    message: i18nValidationMessage('validation.maxLength', {
      property: 'Email',
      characters: 737106,
    }),
  })
  @IsNotEmpty({
    message: i18nValidationMessage('validation.isNotEmpty', {
      property: 'Email',
    }),
  })
  email!: string;

  //*******************************************/

  @ApiProperty({
    description: "User's password when registering",
    example: 'GreaTPassWord123',
    name: 'password',
    required: true,
    minLength: 8,
    maxLength: 20,
    pattern: `/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[a-zA-Z!#$@^%&?.-_-*/ "])[a-zA-Z0-9!#$@^%&?.-_-*/]{8,20}$/`,
    type: 'string',
  })
  @IsNotEmpty({
    message: i18nValidationMessage('validation.isNotEmpty', {
      property: 'Password',
    }),
  })
  @IsString({
    message: i18nValidationMessage('validation.isString', {
      property: 'Password',
    }),
  })
  @MinLength(8, {
    message: i18nValidationMessage('validation.minLength', {
      property: 'Password',
      characters: 8,
    }),
  })
  @MaxLength(20, {
    message: i18nValidationMessage('validation.maxLength', {
      property: 'Password',
      characters: 20,
    }),
  })
  @PasswordContainsNumbers()
  @PasswordContainsSpecialCharacter()
  @PasswordContainsLowercaseLetter()
  @PasswordContainsUppercaseLetter()
  password!: string;

  //*******************************************/

  @ApiProperty({
    description:
      "Admin's confirm password when registering, must match password property",
    example: 'GreaTPassWord123',
    name: 'confirmPassword',
    required: true,
    minLength: 8,
    maxLength: 20,
    pattern: `/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[a-zA-Z!#$@^%&?.-_-*/ "])[a-zA-Z0-9!#$@^%&?.-_-*/]{8,20}$/`,
    type: 'string',
  })
  @IsNotEmpty({
    message: i18nValidationMessage('validation.isNotEmpty', {
      property: 'Confirm Password',
    }),
  })
  @IsString({
    message: i18nValidationMessage('validation.isString', {
      property: 'Confirm Password',
    }),
  })
  @MinLength(8, {
    message: i18nValidationMessage('validation.minLength', {
      property: 'Confirm Password',
      characters: 8,
    }),
  })
  @MaxLength(20, {
    message: i18nValidationMessage('validation.maxLength', {
      property: 'Confirm Password',
      characters: 20,
    }),
  })
  @PasswordContainsNumbers()
  @PasswordContainsSpecialCharacter()
  @PasswordContainsLowercaseLetter()
  @PasswordContainsUppercaseLetter()
  @Match('password')
  confirmPassword!: string;

  //*******************************************/

  @Allow()
  lon!: number;

  //*******************************************/

  @Allow()
  lat!: number;
}
