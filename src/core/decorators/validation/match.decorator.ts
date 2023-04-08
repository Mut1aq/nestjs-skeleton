import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'Match' })
export class MatchConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments): boolean {
    const objectProperties = args.object as any;
    const [relatedPropertyName] = args.constraints;

    const relatedValue = objectProperties[relatedPropertyName]; // original value (decorator)
    return value === relatedValue;
  }
  defaultMessage(_?: ValidationArguments): string {
    return 'validation.confirmPasswordMatch';
  }
}

/**
 * ### Custom validate decorator to match any two properties with each other
 * @param property the original property that you want to match with
 * @param validationOptions class-validator options
 * @returns weather they match or not (true/false)
 */
export function Match(property: string, validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [property],
      validator: MatchConstraint,
    });
  };
}
