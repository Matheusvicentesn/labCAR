import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length, Validate } from 'class-validator';
import { AgeValidation } from 'src/common/validations/ageValidation';
import { BirthDateValidation } from 'src/common/validations/birthDateValidation';
import { LicensePlateValidation } from 'src/common/validations/licensePlateValidation';

export class DriverUpdateDTO {
  @ApiProperty({ description: 'User name' })
  @ApiProperty({ example: 'Exemple Name' })
  @IsNotEmpty({
    message: 'Name is required',
  })
  @IsString({
    message: 'Name must be a string',
  })
  @Length(0, 50, {
    message: 'Name must contain between 5 and 50 characters',
  })
  name: string;

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

  @ApiProperty({ example: 'AAA0A00' })
  @IsNotEmpty({
    message: 'License Plate is required',
  })
  @IsString({
    message: 'License Plate must be a string',
  })
  @Validate(LicensePlateValidation)
  license_plate: string;

  @ApiProperty({ example: 'Sedan' })
  @IsNotEmpty({
    message: 'Vehicle Model date is required',
  })
  @IsString({
    message: 'Vehicle Model date must be a string',
  })
  vehicle_model: string;
}
