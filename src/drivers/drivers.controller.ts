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
import { DriversService } from './drivers.service';

import { Block, Driver } from './entities/driver.entity';

@Controller('drivers')
export class DriversController {
  constructor(private readonly driversService: DriversService) {}

  // Cadastar usuário
  @Post()
  public create(@Body() Driver: Driver): Promise<Driver> {
    return this.driversService.create(Driver);
  }

  // Buscar todos usuários no ARRAY
  @Get()
  public findAll(@Query('page') page = 0, @Query('limit') limit = 50) {
    return this.driversService.findAll(page, limit);
  }

  // Buscar usuário(s) por nome
  @Get(':id')
  public findOne(@Param('id') id: string) {
    return this.driversService.findOne(id);
  }

  // Buscar usuário por CPF
  @Get('/cpf/:cpf')
  public findByCPF(@Param('cpf') cpf: string) {
    return this.driversService.findByCPF(cpf);
  }

  // Bloquear usuário
  @Patch('block/:cpf')
  public blockDriver(@Param('cpf') cpf: string) {
    return this.driversService.blockDriver(cpf);
  }

  @Put(':cpf')
  public updateDriver(@Body() Driver: Driver, @Param('cpf') cpf: string) {
    return this.driversService.updateDriver(Driver, cpf);
  }

  @Delete(':cpf')
  public remove(@Param('cpf') cpf: string) {
    return this.driversService.remove(cpf);
  }
}
