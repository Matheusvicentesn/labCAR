import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsNotEmpty, IsString, Matches } from 'class-validator';
export enum Status {
  CREATED = 'CREATED',
  ACCEPTED = 'ACCEPTED',
  REFUSED = 'REFUSED',
}

export class TripDTO {
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
  @Exclude({
    toPlainOnly: true,
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

  trip_status?: Status;
}
