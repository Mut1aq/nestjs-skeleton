import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsNotEmpty,
  IsEmail,
  MinLength,
  IsString,
  MaxLength,
} from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { PasswordContainsLowercaseLetter } from 'src/shared/decorators/validation/password/lowercase-letters.decorator';
import { PasswordContainsNumbers } from 'src/shared/decorators/validation/password/numbers.decorator';
import { PasswordContainsSpecialCharacter } from 'src/shared/decorators/validation/password/special-characters.decorator';
import { PasswordContainsUppercaseLetter } from 'src/shared/decorators/validation/password/uppercase-letters.decorator';

export class LoginDto {
  @ApiProperty({
    description: "User's Email when registering",
    example: 'mutlaqalsadeed@gmail.com',
    name: 'email',
    required: true,
    uniqueItems: true,
    type: 'string',
  })
  @IsNotEmpty({
    message: i18nValidationMessage('validation.isNotEmpty', {
      property: 'Email',
    }),
  })
  @Transform((param) => param.value.toLowerCase().trim())
  @IsEmail(undefined, {
    message: i18nValidationMessage('validation.email'),
  })
  @MinLength(5, {
    message: i18nValidationMessage('validation.minLength', {
      property: 'Email',
      characters: 5,
    }),
  })
  email: string;

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
  password: string;
}
