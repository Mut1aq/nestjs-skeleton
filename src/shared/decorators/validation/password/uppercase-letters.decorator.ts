import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';
import { uppercaseLetters } from 'src/shared/constants/general-constants';

@ValidatorConstraint({ name: 'PasswordContainsUppercaseLetter' })
@Injectable()
export class PasswordContainsUppercaseLetterConstraint
  implements ValidatorConstraintInterface
{
  message: string = '';

  async validate(
    value: string = '',
    validationArguments?: ValidationArguments,
  ): Promise<boolean> {
    for (const uppercaseLetter of uppercaseLetters) {
      if (value.includes(uppercaseLetter)) return true;
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
 * #### Custom Validator to check if a Password contains an uppercase letter
 */
export function PasswordContainsUppercaseLetter(
  validationOptions?: ValidationOptions,
) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: PasswordContainsUppercaseLetterConstraint,
    });
  };
}
