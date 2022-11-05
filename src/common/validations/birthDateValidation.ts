import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'BirthDateValidation', async: true })
@Injectable()
export class BirthDateValidation implements ValidatorConstraintInterface {
  validate(value: string): boolean {
    const pattern =
      /(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d/;
    if (!pattern.test(value)) {
      return false;
    } else {
      return true;
    }
  }

  defaultMessage(args: ValidationArguments) {
    return `Date of birth must be in dd/mm/yyyy format.`;
  }
}
