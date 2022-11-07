import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Put,
  Patch,
} from '@nestjs/common';
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DriversService } from './drivers.service';
import { DriverDTO } from './dto/driver.dto';
import { DriverUpdateDTO } from './dto/driverUpdate.dto';

import { Driver } from './entities/driver.entity';

@ApiTags('Drivers')
@Controller('drivers')
export class DriversController {
  constructor(private readonly driversService: DriversService) {}

  // Cadastar Motorista
  @ApiResponse({ status: 409, description: 'CPF Already exist in database' })
  @ApiResponse({
    status: 400,
    description: 'Information sent in the body incorrectly ',
  })
  @Post()
  public create(@Body() Driver: DriverDTO): Promise<Driver> {
    return this.driversService.create(Driver);
  }

  // Busca Motoristas
  @ApiResponse({ status: 404, description: 'Driver not found' })
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
    return this.driversService.findAll(page, size, name);
  }

  // Buscar Motorista por CPF
  @ApiResponse({ status: 404, description: 'Driver not found' })
  @Get(':cpf')
  public findByCPF(@Param('cpf') cpf: string) {
    return this.driversService.findByCPF(cpf);
  }

  // Bloquear motorista
  @ApiResponse({ status: 404, description: 'Driver not found' })
  @Patch(':cpf')
  public blockDriver(@Param('cpf') cpf: string) {
    return this.driversService.blockDriver(cpf);
  }
  // Atualizar motorista
  @ApiResponse({ status: 404, description: 'Driver not found' })
  @ApiResponse({ status: 409, description: 'CPF Already exist in database' })
  @Put(':cpf')
  public updateDriver(
    @Body() Driver: DriverUpdateDTO,
    @Param('cpf') cpf: string,
  ) {
    return this.driversService.updateDriver(Driver, cpf);
  }
  // Apagar motorista
  @ApiResponse({ status: 404, description: 'Driver not found' })
  @Delete(':cpf')
  public remove(@Param('cpf') cpf: string) {
    return this.driversService.remove(cpf);
  }
}
