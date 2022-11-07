import { IsNotEmpty, IsString, Length, Validate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { AgeValidation } from 'src/common/validations/ageValidation';
import { BirthDateValidation } from 'src/common/validations/birthDateValidation';
import { CpfValidation } from 'src/common/validations/cpfValidation';

export class PassengerUpdateDTO {
  @ApiProperty({ description: 'User name' })
  @ApiProperty({ example: 'Exemple Name' })
  @IsNotEmpty({
    message: 'Name is required',
  })
  @IsString({
    message: 'Name must be a string',
  })
  @Length(3, 50, {
    message: 'Name must contain between 3 and 50 characters',
  })
  name: string;

  @ApiProperty({ example: '00000000000' })
  @IsNotEmpty({
    message: 'CPF is required',
  })
  @IsString({
    message: 'CPF must be a string',
  })
  @Validate(CpfValidation)
  CPF: string;

  @ApiProperty({ example: '01/01/2000' })
  @IsNotEmpty({
    message: 'Birth date is required',
  })
  @IsString({
    message: 'Birth date must be a string',
  })
  @Validate(BirthDateValidation)
  @Validate(AgeValidation)
  birth_date: string;

  @ApiProperty({ example: 'Rua A' })
  @IsNotEmpty({
    message: 'addres is required',
  })
  @IsString({
    message: 'addres must be a string',
  })
  addres: string;
}
