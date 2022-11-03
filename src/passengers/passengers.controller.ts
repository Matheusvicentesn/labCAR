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
  @Post()
  public create(@Body() Passenger: Passenger): Promise<Passenger> {
    return this.passengersService.create(Passenger);
  }

  // Busca Passageiros
  @ApiQuery({
    name: 'limit',
    description: 'Number of objects in response JSON. Default = 50',
    required: false,
  })
  @ApiQuery({
    name: 'page',
    description: 'Number of pages in response JSON. Default = 1',
    required: false,
  })
  @Get()
  public findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 50,
    @Query('name') name,
  ) {
    return this.passengersService.findAll(page, limit, name);
  }

  // @Get(':id')
  // public findOne(@Param('id') id: string) {
  //   return this.passengersService.findOne(id);
  // }

  // Buscar usuário por CPF
  @ApiResponse({ status: 404, description: 'Driver not found' })
  @Get('/cpf/:cpf')
  public findByCPF(@Param('cpf') cpf: string) {
    return this.passengersService.findByCPF(cpf);
  }
  // Atualizar passageiro
  @ApiResponse({ status: 404, description: 'Driver not found' })
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
