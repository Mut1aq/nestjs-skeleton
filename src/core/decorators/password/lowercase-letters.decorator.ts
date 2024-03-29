import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';
import { lowercaseLetters } from '@shared/constants/validation/validation-constants';

@ValidatorConstraint({ name: 'PasswordContainsLowercaseLetter' })
@Injectable()
export class PasswordContainsLowercaseLetterConstraint
  implements ValidatorConstraintInterface
{
  message: string = '';

  async validate(
    value: string = '',
    _?: ValidationArguments,
  ): Promise<boolean> {
    for (const lowercaseLetter of lowercaseLetters) {
      if (value?.includes(lowercaseLetter)) return true;
    }

    return false;
  }
  defaultMessage(validationArguments?: ValidationArguments): any {
    if (validationArguments?.property === 'confirmPassword') {
      return 'validation.confirmPasswordContains.lowercase';
    }
    return 'validation.passwordContains.lowercase';
  }
}
/**
 * #### Custom Validator to check if a Password contains a lowercase letter
 */
export function PasswordContainsLowercaseLetter(
  validationOptions?: ValidationOptions,
) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: PasswordContainsLowercaseLetterConstraint,
    });
  };
}
