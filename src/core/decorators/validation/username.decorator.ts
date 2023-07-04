import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';
import {
  lowercaseLetters,
  numbers,
  stringNumbers,
  uppercaseLetters,
} from '@shared/constants/validation/validation-constants';
import { checkNullability } from '@shared/util/check-nullability.util';

@ValidatorConstraint({ name: 'Username' })
@Injectable()
export class UsernameConstraint implements ValidatorConstraintInterface {
  message!: string;

  validate(username: string, __?: ValidationArguments): boolean {
    if (!checkNullability(username)) return true;
    const usernameCharacters = username?.split('');
    const acceptedChars = [
      ...lowercaseLetters,
      ...uppercaseLetters,
      ...numbers,
      ...stringNumbers,
      '.',
      '_',
    ];

    const isUsernameContainUnwantedChars = usernameCharacters?.find(
      (usernameChar) => !acceptedChars?.includes(usernameChar),
    );

    if (isUsernameContainUnwantedChars) {
      this.message = 'validation.usernameAcceptedChar';
      return false;
    }

    const isContainConsecutiveDots = usernameCharacters?.find(
      (usernameChar, index) =>
        usernameChar === '.' &&
        (index + 1 < usernameCharacters?.length
          ? usernameCharacters[index + 1] === '.'
          : true),
    );

    if (isContainConsecutiveDots) {
      this.message = 'validation.consecutiveDots';
      return false;
    }

    const isUsernameContainTrailingOrLeadingDots =
      username[0] === '.' && username[username?.length - 1];

    if (isUsernameContainTrailingOrLeadingDots) {
      this.message = 'validation.leadingTrillingDot';
      return false;
    }

    return true;
  }
  defaultMessage(_?: ValidationArguments): string {
    return this.message;
  }
}

export function Username(validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: UsernameConstraint,
    });
  };
}
