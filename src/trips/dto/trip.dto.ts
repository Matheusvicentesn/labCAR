import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsNotEmpty, IsString, Validate } from 'class-validator';
import { CpfValidation } from 'src/common/validations/cpfValidation';
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
  @Validate(CpfValidation)
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
