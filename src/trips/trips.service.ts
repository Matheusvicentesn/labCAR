import { ConflictException, Injectable } from '@nestjs/common';
import { Database } from 'src/database/database';
import { TripDTO } from './dto/trip.dto';
import { Status, Trip } from './entities/trip.entity';

@Injectable()
export class TripsService {
  constructor(private database: Database) {}

  public async create(trip: Trip) {
    const passengerExist = await this.database
      .getPassengers()
      .find((passanger) => passanger.CPF === trip.CPF);
    if (!passengerExist) {
      throw new ConflictException({
        statusCode: 409,
        message: 'Passenger no exists in the database',
      });
    }
    trip.passager_name = passengerExist.name;
    trip.trip_status = Status.CREATED;

    this.database.writeTrip(trip);
    return {
      passager_name: trip?.passager_name,
      origin_address: trip?.origin_address,
      destination_address: trip?.destination_address,
      trip_status: trip?.trip_status,
    };
  }

  public findByCPF(cpf: string) {
    const passengers = this.database
      .getPassengers()
      .find((passenger) => passenger.CPF === cpf);

    return passengers;
  }

  // Buscar todos usuários no ARRAY
  public async findAll(page, limit): Promise<Trip[]> {
    const pagination = await this.database
      .getTrips()
      .slice(page * limit, page * limit + limit);
    console.log(pagination);
    return pagination;
  }

  public async findNear(page, limit, trip) {
    const viagens = await this.database
      .getTrips()
      .slice(page * limit, page * limit + limit);

    return {
      driverAdress: trip,
      nearTrips: viagens,
    };
  }
}
