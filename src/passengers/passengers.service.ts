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

  public remove(cpf: string) {
    const passengers = this.database
      .getPassengers()
      .filter((passenger) => passenger.CPF != cpf);

    this.database.deletePassengers(passengers);
    return {
      message: `User with CPF: ${cpf} has been deleted`,
    };
  }

  public async updatePassenger(passengerBody, cpf) {
    const drivers = this.database.getPassengers();

    const updatePassenger = drivers.map((passenger) => {
      if (passenger.CPF === cpf) {
        passenger.name = passengerBody.name || passenger.name;
        passenger.birth_date = passengerBody.birth_date || passenger.birth_date;
        passenger.addres = passengerBody.addres || passenger.addres;
        passenger.CPF = passengerBody.CPF || passenger.CPF;
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
