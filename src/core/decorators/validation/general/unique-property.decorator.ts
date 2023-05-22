import { UserDocument } from '@modules/system-users/users/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Model } from 'mongoose';

@ValidatorConstraint({ name: 'UniqueUserProperty', async: true })
@Injectable()
export class UniqueUserPropertyConstraint
  implements ValidatorConstraintInterface
{
  constructor(
    @InjectModel('User')
    private readonly userModel: Model<UserDocument>,
  ) {}

  async validate(
    value: string,
    validationArguments?: ValidationArguments,
  ): Promise<any> {
    const [property] = validationArguments?.constraints as string[];

    const user = await this.userModel.findOne({
      [property]: value,
    });
    if (!user) {
      return true;
    }
    return false;
  }
}

export function UniqueUserProperty(
  property: string,
  validationOptions: ValidationOptions,
) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: UniqueUserPropertyConstraint,
      constraints: [property],
    });
  };
}
