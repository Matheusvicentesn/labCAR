import { ApiHideProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
export enum Status {
  CREATED = 'CREATED',
  ACCEPTED = 'ACCEPTED',
  REFUSED = 'REFUSED',
}

export class Trip {
  @IsNotEmpty({
    message: 'CPF is required',
  })
  @IsString({
    message: 'CPF must be a string',
  })
  @ApiHideProperty()
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
