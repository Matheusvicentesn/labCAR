import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Database } from 'src/database/database';
import { ageValidator } from 'src/utils/ageValidator';
import { Passenger } from './entities/passenger.entity';

@Injectable()
export class PassengersService {
  constructor(private database: Database) {}

  // Cadastar Passageiro
  public async create(passenger: Passenger): Promise<Passenger> {
    const passengerExist = await this.database
      .getPassengers()
      .find((drivers) => drivers.CPF === passenger.CPF);
    if (passengerExist) {
      throw new ConflictException({
        statusCode: 409,
        message: 'CPF already exists in the database',
      });
    }
    const age = ageValidator(passenger.birth_date);
    if (age < 18) {
      throw new ConflictException({
        statusCode: 409,
        message: 'User must be of legal age',
      });
    }
    this.database.writePassengers(passenger);
    return passenger;
  }

  // Busca Passageiros
  public async findAll(page, limit, name) {
    if (page < 1) {
      throw new BadRequestException({
        statusCode: 400,
        message: 'Pagination start with number 1',
      });
    } else if (name) {
      const namePassanger = this.findOne(name);
      const nameDriverPaginated = (await namePassanger).slice(
        (page - 1) * limit,
        page * limit,
      );
      return nameDriverPaginated;
    } else {
      const pagination = await this.database
        .getPassengers()
        .slice((page - 1) * limit, page * limit);
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
