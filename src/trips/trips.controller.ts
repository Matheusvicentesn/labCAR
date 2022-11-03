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
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { TripDTO } from './dto/trip.dto';
import { Trip } from './entities/trip.entity';
import { TripsService } from './trips.service';

@ApiTags('Trips')
@Controller('trips')
export class TripsController {
  constructor(private readonly tripsService: TripsService) {}
  // Cadastar Motorista
  @ApiResponse({
    status: 409,
    description: 'Passenger no exists in the database',
  })
  @Post()
  create(@Body() trip: TripDTO) {
    return this.tripsService.create(trip);
  }

  // Buscar todos usuários no ARRAY
  @Get()
  public findAll(
    @Query('page') page = 0,
    @Query('limit') limit = 50,
  ): Promise<Trip[]> {
    return this.tripsService.findAll(page, limit);
  }

  @Put('/findnear')
  public findOne(
    @Query('page') page = 0,
    @Query('limit') limit = 3,
    @Body() trip,
  ) {
    return this.tripsService.findOne(page, limit, trip);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tripsService.remove(+id);
  }
}
