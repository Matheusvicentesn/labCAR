import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length, Matches } from 'class-validator';

export class DriverDTO {
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
  @Matches(/(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d/, {
    message: 'Date of birth must be in dd/mm/yyyy format.',
  })
  birth_date: string;

  @ApiProperty({ example: '00000000000' })
  @IsNotEmpty({
    message: 'CPF is required',
  })
  @IsString({
    message: 'CPF must be a string',
  })
  @Matches(
    /^([0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}|[0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}\-?[0-9]{2})$/,
    {
      message: 'CPF must have 11 numeric digits without punctuation.',
    },
  )
  CPF: string;

  @ApiProperty({ example: 'AAA0A00' })
  @IsNotEmpty({
    message: 'License Plate is required',
  })
  @IsString({
    message: 'License Plate must be a string',
  })
  @Matches(/^[a-zA-Z]{3}[0-9][A-Za-z0-9][0-9]{2}$/, {
    message:
      'Vehicle license plate must be in Brazilian format. Example: AAA0A00',
  })
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
