import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';
import { specialCharacters } from 'src/shared/constants/validation/validation-constants';

@ValidatorConstraint({ name: 'PasswordContainsSpecialCharacterConstraint' })
@Injectable()
export class PasswordContainsSpecialCharacterConstraint
  implements ValidatorConstraintInterface
{
  message: string = '';

  async validate(
    value: string = '',
    validationArguments?: ValidationArguments,
  ): Promise<boolean> {
    for (const specialCharacter of specialCharacters) {
      if (value.includes(specialCharacter) && specialCharacter !== '')
        return true;
    }

    return false;
  }

  defaultMessage(validationArguments?: ValidationArguments): any {
    if (validationArguments?.property === 'confirmPassword') {
      return 'validation.confirmPasswordContains.uppercase';
    }
    return 'validation.passwordContains.uppercase';
  }
}
/**
 * #### Custom Validator to check if a Password contains a lowercase letter
 */
export function PasswordContainsSpecialCharacter(
  validationOptions?: ValidationOptions,
) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: PasswordContainsSpecialCharacterConstraint,
    });
  };
}
