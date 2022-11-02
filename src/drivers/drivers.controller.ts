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
  @Post()
  public create(@Body() Driver: DriverDTO): Promise<Driver> {
    return this.driversService.create(Driver);
  }

  // Buscar todos Motoristas
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
  public findAll(@Query('page') page = 1, @Query('limit') limit = 50) {
    return this.driversService.findAll(page, limit);
  }

  // Buscar motorista(s) por nome
  @ApiResponse({ status: 404, description: 'Driver not found' })
  @Get(':name')
  public findOne(@Param('name') name: string) {
    return this.driversService.findOne(name);
  }

  // Buscar Motorista por CPF
  @ApiResponse({ status: 404, description: 'Driver not found' })
  @Get('/cpf/:cpf')
  public findByCPF(@Param('cpf') cpf: string) {
    return this.driversService.findByCPF(cpf);
  }

  // Bloquear motorista
  @ApiResponse({ status: 404, description: 'Driver not found' })
  @Patch('block/:cpf')
  public blockDriver(@Param('cpf') cpf: string) {
    return this.driversService.blockDriver(cpf);
  }
  // Atualizar motorista
  @ApiResponse({ status: 404, description: 'Driver not found' })
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
