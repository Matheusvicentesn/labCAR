import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'AgeValidation', async: true })
@Injectable()
export class AgeValidation implements ValidatorConstraintInterface {
  validate(value: string): boolean {
    const ano_atual = new Date().getFullYear();
    const data_aniversario = value;
    const ano_informado = parseInt(data_aniversario.split('/')[2]);
    const idade = ano_atual - ano_informado;
    if (idade >= 18) {
      return true;
    }

    return false;
  }

  defaultMessage(args: ValidationArguments) {
    return `User must be of legal age`;
  }
}
