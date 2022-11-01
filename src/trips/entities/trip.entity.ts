import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
export enum Status {
  CREATED,
  ACCEPTED,
  REFUSED,
}

export class Trip {
  @IsNotEmpty({
    message: 'CPF is required',
  })
  @IsString({
    message: 'CPF must be a string',
  })
  CPF: string;

  passager_name: string;

  @IsNotEmpty({
    message: 'origin_address is required',
  })
  @IsString({
    message: 'origin_address must be a string',
  })
  origin_address: string;

  @IsNotEmpty({
    message: 'destination_address is required',
  })
  @IsString({
    message: 'destination_address must be a string',
  })
  destination_address: string;

  trip_status: `CREATED` | `ACCEPTED` | `REFUSED`;
}
