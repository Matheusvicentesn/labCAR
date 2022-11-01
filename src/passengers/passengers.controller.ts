import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Put,
} from '@nestjs/common';
import { Passenger } from './entities/passenger.entity';
import { PassengersService } from './passengers.service';

@Controller('passengers')
export class PassengersController {
  constructor(private readonly passengersService: PassengersService) {}

  // Cadastar usuário
  @Post()
  public create(@Body() Passenger: Passenger): Promise<Passenger> {
    return this.passengersService.create(Passenger);
  }

  // Buscar todos usuários no ARRAY
  @Get()
  public findAll(@Query('page') page = 0, @Query('limit') limit = 50) {
    return this.passengersService.findAll(page, limit);
  }

  // Buscar usuário(s) por nome
  @Get(':id')
  public findOne(@Param('id') id: string) {
    return this.passengersService.findOne(id);
  }

  // Buscar usuário por CPF
  @Get('/cpf/:cpf')
  public findByCPF(@Param('cpf') cpf: string) {
    return this.passengersService.findByCPF(cpf);
  }

  // Bloquear usuário
  @Patch('block/:cpf')
  public blockDriver(@Param('cpf') cpf: string) {
    return this.passengersService.blockPassenger(cpf);
  }

  @Put(':cpf')
  public updatePassenger(
    @Body() Passenger: Passenger,
    @Param('cpf') cpf: string,
  ) {
    return this.passengersService.updatePassenger(Passenger, cpf);
  }

  @Delete(':cpf')
  public remove(@Param('cpf') cpf: string) {
    return this.passengersService.remove(cpf);
  }
}
