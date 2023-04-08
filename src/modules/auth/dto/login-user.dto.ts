import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsNotEmpty,
  IsEmail,
  MinLength,
  IsString,
  MaxLength,
  IsOptional,
} from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { PasswordContainsLowercaseLetter } from 'src/core/decorators/validation/password/lowercase-letters.decorator';
import { PasswordContainsNumbers } from 'src/core/decorators/validation/password/numbers.decorator';
import { PasswordContainsSpecialCharacter } from 'src/core/decorators/validation/password/special-characters.decorator';
import { PasswordContainsUppercaseLetter } from 'src/core/decorators/validation/password/uppercase-letters.decorator';
import { Username } from 'src/core/decorators/validation/username.decorator';

export class LoginUserDto {
  @ApiProperty({
    description: "User's Email when registering",
    example: 'mutlaqalsadeed@gmail.com',
    name: 'email',
    required: true,
    uniqueItems: true,
    type: 'string',
  })
  @Transform((param) => param?.value?.toLowerCase()?.trim())
  @MinLength(5, {
    message: i18nValidationMessage('validation.minLength', {
      property: 'Email',
      characters: 5,
    }),
  })
  @MaxLength(320, {
    message: i18nValidationMessage('validation.maxLength', {
      property: 'Email',
      characters: 320,
    }),
  })
  @IsEmail(undefined, {
    message: i18nValidationMessage('validation.email'),
  })
  @IsNotEmpty({
    message: i18nValidationMessage('validation.isNotEmpty', {
      property: 'Email',
    }),
  })
  @IsOptional()
  readonly email!: string;

  //*******************************************/

  @ApiProperty({
    description: "Anime Fan's username",
    type: 'string',
    required: false,
    example: 'mut1aq',
    name: 'username',
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
  @IsOptional()
  username!: string;

  //*******************************************/

  @ApiProperty({
    description: 'User password when registering',
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
  @IsString({
    message: i18nValidationMessage('validation.isString', {
      property: 'Password',
    }),
  })
  @IsNotEmpty({
    message: i18nValidationMessage('validation.isNotEmpty', {
      property: 'Password',
    }),
  })
  readonly password!: string;
}
