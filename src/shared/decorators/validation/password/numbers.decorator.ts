import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';
import { numbers } from 'src/shared/constants/general-constants';

@ValidatorConstraint({ name: 'PasswordContainsNumbers' })
@Injectable()
export class PasswordContainsNumbersConstraint
  implements ValidatorConstraintInterface
{
  message: string;

  async validate(
    value: string = '',
    validationArguments?: ValidationArguments,
  ): Promise<boolean> {
    for (const number of numbers) {
      if (value.includes(`${number}`)) return true;
    }

    return false;
  }

  defaultMessage(validationArguments?: ValidationArguments): any {
    if (validationArguments.property === 'confirmPassword') {
      return 'validation.confirmPasswordContains.uppercase';
    }
    return 'validation.passwordContains.uppercase';
  }
}
/**
 * #### Custom Validator to check if a Password contains a number
 */
export function PasswordContainsNumbers(validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: PasswordContainsNumbersConstraint,
    });
  };
}
