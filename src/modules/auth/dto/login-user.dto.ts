import { PasswordContainsLowercaseLetter } from '@decorators/validation/password/lowercase-letters.decorator';
import { PasswordContainsNumbers } from '@decorators/validation/password/numbers.decorator';
import { PasswordContainsSpecialCharacter } from '@decorators/validation/password/special-characters.decorator';
import { PasswordContainsUppercaseLetter } from '@decorators/validation/password/uppercase-letters.decorator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, MinLength, IsString, MaxLength } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class LoginUserDto {
  @ApiProperty({
    description: "User's credentials when registering",
    example: 'mutlaqalsadeed@gmail.com or 0795367929 or mut1aq',
    name: 'credentials',
    required: true,
    uniqueItems: true,
    type: 'string',
  })
  @Transform((param) => param?.value?.toLowerCase()?.trim())
  @MinLength(5, {
    message: i18nValidationMessage('validation.minLength', {
      property: 'credentials',
      characters: 5,
    }),
  })
  @MinLength(3, {
    message: i18nValidationMessage('validation.minLength', {
      property: 'credentials',
      characters: 3,
    }),
  })
  @IsNotEmpty({
    message: i18nValidationMessage('validation.isNotEmpty', {
      property: 'credentials',
    }),
  })
  readonly credentials!: string;

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
