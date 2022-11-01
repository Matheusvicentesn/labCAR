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
import { Trip } from './entities/trip.entity';
import { TripsService } from './trips.service';

@Controller('trips')
export class TripsController {
  constructor(private readonly tripsService: TripsService) {}

  @Post()
  create(@Body() trip: Trip) {
    return this.tripsService.create(trip);
  }

  // Buscar todos usuários no ARRAY
  @Get()
  public findAll(@Query('page') page = 0, @Query('limit') limit = 50) {
    return this.tripsService.findAll(page, limit);
  }

  @Get('/findnear')
  public findOne(@Query('page') page = 0, @Query('limit') limit = 2) {
    return this.tripsService.findAll(page, limit);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() trip: Trip) {
    return this.tripsService.update(+id, trip);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tripsService.remove(+id);
  }
}
