import { IsNotEmpty, IsString } from 'class-validator';
export class Passenger {
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
    message: 'addres is required',
  })
  @IsString({
    message: 'addres must be a string',
  })
  addres: string;
}
