import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { TripDTO } from './dto/trip.dto';
import { tripFindNear } from './dto/tripFindNear.tso';
import { TripsService } from './trips.service';

@ApiTags('Trips')
@Controller('trips')
export class TripsController {
  constructor(private readonly tripsService: TripsService) {}
  // Cadastar viagem
  @ApiResponse({
    status: 409,
    description: 'Passenger no exists in the database',
  })
  @Post()
  create(@Body() trip: TripDTO) {
    return this.tripsService.create(trip);
  }

  // Buscar todas as viagens
  @Get()
  public findAll(): Promise<TripDTO[]> {
    return this.tripsService.findAll();
  }

  // Procurar viagens próximas
  @Post('/findnear')
  public findNear(
    @Query('page') page = 1,
    @Query('size') size = 3,
    @Body() trip: tripFindNear,
  ) {
    return this.tripsService.findNear(page, size, trip);
  }
}
