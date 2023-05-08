import { Match } from '@decorators/validation/match.decorator';
import { PasswordContainsLowercaseLetter } from '@decorators/validation/password/lowercase-letters.decorator';
import { PasswordContainsNumbers } from '@decorators/validation/password/numbers.decorator';
import { PasswordContainsSpecialCharacter } from '@decorators/validation/password/special-characters.decorator';
import { PasswordContainsUppercaseLetter } from '@decorators/validation/password/uppercase-letters.decorator';
import { UniqueUserProperty } from '@decorators/validation/unique-property.decorator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
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
  @MinLength(3, {
    message: i18nValidationMessage('validation.minLength', {
      property: 'Email',
      characters: 3,
    }),
  })
  @Transform((param) => param?.value?.toLowerCase()?.trim())
  @IsEmail(undefined, {
    message: i18nValidationMessage('validation.email'),
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
  readonly email!: string;

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
  @PasswordContainsNumbers()
  @PasswordContainsSpecialCharacter()
  @PasswordContainsLowercaseLetter()
  @PasswordContainsUppercaseLetter()
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
  @IsNotEmpty({
    message: i18nValidationMessage('validation.isNotEmpty', {
      property: 'Password',
    }),
  })
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
  @Match('password')
  @PasswordContainsNumbers()
  @PasswordContainsSpecialCharacter()
  @PasswordContainsLowercaseLetter()
  @PasswordContainsUppercaseLetter()
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
  @IsNotEmpty({
    message: i18nValidationMessage('validation.isNotEmpty', {
      property: 'Password',
    }),
  })
  readonly confirmPassword!: string;

  //*******************************************/
}
