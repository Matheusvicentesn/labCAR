import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Put,
} from '@nestjs/common';
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PassengerUpdateDTO } from './dto/passengerUpdate.dto';
import { Passenger } from './entities/passenger.entity';
import { PassengersService } from './passengers.service';

@ApiTags('Passengers')
@Controller('passengers')
export class PassengersController {
  constructor(private readonly passengersService: PassengersService) {}

  // Cadastar Passageiro
  @ApiResponse({ status: 409, description: 'CPF Already exist in database' })
  @ApiResponse({
    status: 400,
    description: 'Information sent in the body incorrectly ',
  })
  @Post()
  public create(@Body() Passenger: Passenger): Promise<Passenger> {
    return this.passengersService.create(Passenger);
  }

  // Busca Passageiros
  @ApiResponse({ status: 404, description: 'Passenger not found' })
  @ApiQuery({
    name: 'size',
    description: 'Number of objects in response JSON. Default = 50',
    required: false,
  })
  @ApiQuery({
    name: 'page',
    description: 'Number of pages in response JSON. Default = 1',
    required: false,
  })
  @ApiQuery({
    name: 'name',
    description: 'Search Drivers by name',
    required: false,
  })
  @Get()
  public findAll(
    @Query('page') page = 1,
    @Query('size') size = 50,
    @Query('name') name,
  ) {
    return this.passengersService.findAll(page, size, name);
  }

  // Buscar passageiro por CPF
  @ApiResponse({ status: 404, description: 'Driver not found' })
  @Get(':cpf')
  public findByCPF(@Param('cpf') cpf: string) {
    return this.passengersService.findByCPF(cpf);
  }

  // Atualizar passageiro
  @ApiResponse({ status: 404, description: 'Driver not found' })
  @ApiResponse({ status: 409, description: 'CPF Already exist in database' })
  @Put(':cpf')
  public updatePassenger(
    @Body() Passenger: PassengerUpdateDTO,
    @Param('cpf') cpf: string,
  ) {
    return this.passengersService.updatePassenger(Passenger, cpf);
  }
  // Apagar passageiro
  @ApiResponse({ status: 404, description: 'Driver not found' })
  @Delete(':cpf')
  public remove(@Param('cpf') cpf: string) {
    return this.passengersService.remove(cpf);
  }
}
