import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Database } from 'src/database/database';
import { Passenger } from './entities/passenger.entity';

@Injectable()
export class PassengersService {
  constructor(private database: Database) {}

  // Cadastar usuário
  public async create(passenger: Passenger): Promise<Passenger> {
    const passengerExist = await this.findByCPF(passenger.CPF);
    if (passengerExist) {
      throw new ConflictException({
        statusCode: 409,
        message: 'CPF already exists in the database',
      });
    }
    passenger.blocked = false;
    this.database.writePassengers(passenger);
    return passenger;
  }

  // Buscar todos usuários no ARRAY
  public async findAll(page, limit) {
    return await this.database
      .getPassengers()
      .slice(page * limit, page * limit + limit);
  }

  // Buscar usuário(s) por nome
  public async findOne(id: string) {
    const passenger = await this.database
      .getPassengers()
      .filter((passenger) => passenger.name.includes(id));

    if (passenger.length <= 0) {
      console.log(passenger);
      throw new NotFoundException({
        statusCode: 404,
        message: 'Users not found',
      });
    } else {
      return passenger;
    }
  }

  // Buscar usuário por CPF
  public findByCPF(cpf: string) {
    const passenger = this.database
      .getPassengers()
      .find((passenger) => passenger.CPF === cpf);
    return passenger;
  }

  public blockPassenger(cpf: string) {
    const passenger = this.database.getPassengers();
    const newList = passenger.map((passenger) => {
      if (passenger.CPF === cpf) {
        passenger.blocked = passenger.blocked != true;
      }
      return passenger;
    });
    this.database.updatePassengers(newList);
    const passengerFilter = this.database
      .getPassengers()
      .find((passenger) => passenger.CPF === cpf);
    return passengerFilter;
  }

  public remove(cpf: string) {
    const passengers = this.database
      .getPassengers()
      .filter((passenger) => passenger.CPF != cpf);

    this.database.deletePassengers(passengers);
    return passengers;
  }

  public updatePassenger(passengerDriver, cpf) {
    const drivers = this.database.getPassengers();

    const updatePassenger = drivers.map((passenger) => {
      if (passenger.CPF === cpf) {
        passenger.name = passengerDriver.name || passenger.name;
        passenger.birth_date =
          passengerDriver.birth_date || passenger.birth_date;
        passenger.CPF = passengerDriver.CPF || passenger.CPF;
        passenger.license_plate =
          passengerDriver.license_plate || passenger.license_plate;
        passenger.vehicle_model =
          passengerDriver.vehicle_model || passenger.vehicle_model;
        // driver.blocked = driverBody.blocked || driver.blocked;
      }
      return passenger;
    });
    this.database.updatePassengers(updatePassenger);
    const userFilter = this.database
      .getPassengers()
      .find((passenger) => passenger.CPF === cpf);
    return userFilter;
  }
}
