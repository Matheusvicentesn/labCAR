import { ConflictException, Injectable } from '@nestjs/common';
import { Database } from 'src/database/database';
import { Status, Trip } from './entities/trip.entity';

@Injectable()
export class TripsService {
  constructor(private database: Database) {}

  public async create(trip: Trip) {
    const passenger = this.database
      .getPassengers()
      .find((passenger) => passenger.CPF === trip.CPF);
    trip.passager_name = passenger.name;
    if (!passenger.CPF) {
      throw new ConflictException({
        statusCode: 409,
        message: 'Passenger no exists in the database',
      });
    }
    trip.trip_status = Status.CREATED;

    this.database.writeTrip(trip);
    return trip;
  }

  public findByCPF(cpf: string) {
    const passenger = this.database
      .getPassengers()
      .find((passenger) => passenger.CPF === cpf);
    return passenger;
  }

  // Buscar todos usuários no ARRAY
  public async findAll(page, limit) {
    return await this.database
      .getTrips()
      .slice(page * limit, page * limit + limit);
  }

  public async findOne(page, limit, trip) {
    const viagens = await this.database
      .getTrips()
      .slice(page * limit, page * limit + limit);

    return {
      driverAdress: trip,
      nearTrips: viagens,
    };
  }

  remove(id: number) {
    return `This action removes a #${id} trip`;
  }
}
