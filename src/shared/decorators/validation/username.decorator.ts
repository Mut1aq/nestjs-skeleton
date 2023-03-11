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
  uppercaseLetters,
} from 'src/shared/constants/validation/validation-constants';
import { checkNullability } from 'src/shared/util/check-nullability.util';

@ValidatorConstraint({ name: 'Username' })
@Injectable()
export class UsernameConstraint implements ValidatorConstraintInterface {
  message!: string;

  async validate(username: string, __?: ValidationArguments): Promise<any> {
    if (!checkNullability(username)) return true;
    const usernameCharacters = username?.split('');
    const acceptedChars = [...lowercaseLetters, ...uppercaseLetters, '.', '_'];

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
  defaultMessage(_?: ValidationArguments): any {
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
