import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { DriversService } from './drivers.service';

import { Driver } from './entities/driver.entity';

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
  public findAll(@Query('page') page = 0, @Query('size') size = 50) {
    return this.driversService.findAll(page, size);
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

  @Patch(':id')
  public update(@Param('id') id: string, @Body() Driver: Driver) {
    return this.driversService.update(+id, Driver);
  }

  @Delete(':id')
  public remove(@Param('id') id: string) {
    return this.driversService.remove(+id);
  }
}
