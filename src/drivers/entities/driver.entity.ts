import { IsNotEmpty, IsString } from 'class-validator';

export class Driver {
  @IsNotEmpty({
    message: 'Name is required',
  })
  @IsString({
    message: 'Name must be a string',
  })
  name: string;
  @IsNotEmpty({
    message: 'Birth date is required',
  })
  @IsString({
    message: 'Birth date must be a string',
  })
  birth_date: string;

  @IsNotEmpty({
    message: 'CPF is required',
  })
  @IsString({
    message: 'CPF must be a string',
  })
  CPF: string;

  @IsNotEmpty({
    message: 'License Plate is required',
  })
  @IsString({
    message: 'License Plate must be a string',
  })
  license_plate: string;

  @IsNotEmpty({
    message: 'Vehicle Model date is required',
  })
  @IsString({
    message: 'Vehicle Model date must be a string',
  })
  vehicle_model: string;
  blocked: boolean;
}
