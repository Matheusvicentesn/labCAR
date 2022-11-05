import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Database } from 'src/database/database';
import { Passenger } from './entities/passenger.entity';

@Injectable()
export class PassengersService {
  constructor(private database: Database) {}

  // Cadastar Passageiro
  public async create(passenger: Passenger) {
    passenger.CPF = passenger.CPF.replace(/([^\d])+/gim, '');
    const passengerExist = await this.database
      .getPassengers()
      .find((passengers) => passengers.CPF === passenger.CPF);
    if (passengerExist) {
      throw new ConflictException({
        statusCode: 409,
        message: 'CPF already exists in the database',
      });
    }
    this.database.writePassengers(passenger);
    return passenger;
  }

  // Busca Passageiros
  public async findAll(page, size, name) {
    if (page < 1) {
      throw new BadRequestException({
        statusCode: 400,
        message: 'Pagination start with number 1',
      });
    } else if (name) {
      const namePassanger = this.findOne(name);
      const namePassengerPaginated = (await namePassanger).slice(
        (page - 1) * size,
        page * size,
      );
      return namePassengerPaginated;
    } else {
      const pagination = await this.database
        .getPassengers()
        .slice((page - 1) * size, page * size);
      return pagination;
    }
  }

  /// Buscar passageiros por nome
  public async findOne(name: string) {
    const passenger = await this.database
      .getPassengers()
      .filter((passenger) =>
        passenger.name.toUpperCase().includes(name.toUpperCase()),
      );

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

  // Buscar passageiros por CPF
  public findByCPF(cpf: string) {
    const passenger = this.database
      .getPassengers()
      .find((passenger) => passenger.CPF === cpf);
    if (!passenger) {
      throw new NotFoundException({
        statusCode: 404,
        message: 'Users not found',
      });
    } else {
      return passenger;
    }
  }

  // Deleter Passageiro
  public remove(cpf: string) {
    this.findByCPF(cpf); // validar CPF
    const passengers = this.database
      .getPassengers()
      .filter((passenger) => passenger.CPF != cpf);

    this.database.deletePassengers(passengers);
    return {
      message: `User with CPF: ${cpf} has been deleted`,
    };
  }

  // Atualizar dados Passageiro
  public async updatePassenger(passengerBody, cpf) {
    this.findByCPF(cpf); // validar CPF
    const passengerExist = await this.database
      .getPassengers()
      .find((passenger) => passenger.CPF === passengerBody.CPF);
    const passengers = this.database.getPassengers();
    const updatePassenger = passengers.map((passenger) => {
      if (passenger.CPF === cpf) {
        passenger.name = passengerBody.name || passenger.name;
        passenger.birth_date = passengerBody.birth_date || passenger.birth_date;
        passenger.addres = passengerBody.addres || passenger.addres;
        passenger.CPF = passengerBody.CPF || passenger.CPF;
        if (passengerBody.CPF != cpf && passengerExist) {
          throw new ConflictException({
            statusCode: 409,
            message: 'CPF already exists in the database',
          });
        }
      }
      return passenger;
    });

    this.database.updatePassengers(updatePassenger);
    const userFilter = this.database
      .getPassengers()
      .find((passenger) => passenger.CPF === passengerBody.CPF);
    return userFilter;
  }
}
