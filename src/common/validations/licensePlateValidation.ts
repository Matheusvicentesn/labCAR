import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'LicensePlateValidation', async: true })
@Injectable()
export class LicensePlateValidation implements ValidatorConstraintInterface {
  validate(value: string): boolean {
    const pattern = /^[a-zA-Z]{3}[0-9][A-Za-z0-9][0-9]{2}$/;
    if (!pattern.test(value)) {
      return false;
    } else {
      return true;
    }
  }

  defaultMessage() {
    return `Vehicle license plate must be in Brazilian format. Example: AAA0A00.`;
  }
}
