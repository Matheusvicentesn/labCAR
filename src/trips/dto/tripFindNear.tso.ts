import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Validate } from 'class-validator';
import { CpfValidation } from 'src/common/validations/cpfValidation';

export class tripFindNear {
  @ApiProperty({ example: '00000000000' })
  @IsNotEmpty({
    message: 'CPF is required',
  })
  @IsString({
    message: 'CPF must be a string',
  })
  @Validate(CpfValidation)
  CPF: string;

  @IsNotEmpty({
    message: 'destination_address is required',
  })
  @IsString({
    message: 'destination_address must be a string',
  })
  driverAdress: string;
}
