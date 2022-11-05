import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'CpfValidation', async: true })
@Injectable()
export class CpfValidation implements ValidatorConstraintInterface {
  validate(value: string): boolean {
    const pattern =
      /^([0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}|[0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}\-?[0-9]{2})$/;
    if (!pattern.test(value)) {
      return false;
    } else {
      return true;
    }
  }

  defaultMessage() {
    return `CPF must have 11 numeric digits. Examples: 00000000000 or 000.000.000-00`;
  }
}
