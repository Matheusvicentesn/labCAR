import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Database } from 'src/database/database';

import { Driver } from './entities/driver.entity';

@Injectable()
export class DriversService {
  constructor(private database: Database) {}

  // Cadastar Motorista
  public async create(driver: Driver): Promise<Driver> {
    driver.CPF = driver.CPF.replace(/([^\d])+/gim, '');
    const driverExist = await this.database
      .getDrivers()
      .find((drivers) => drivers.CPF === driver.CPF);
    // Validar se o CPF já existe
    if (driverExist) {
      throw new ConflictException({
        statusCode: 409,
        message: 'CPF already exists in the database',
      });
    }
    // // Validar idade do usuário
    // const age = ageValidator(driver.birth_date);
    // if (age < 18) {
    //   throw new ConflictException({
    //     statusCode: 400,
    //     message: 'User must be of legal age',
    //   });
    // }

    driver.blocked = false;
    this.database.writeDriver(driver);
    return driver;
  }

  // Busca Motoristas
  public async findAll(page, limit, name) {
    if (page < 1) {
      throw new BadRequestException({
        statusCode: 400,
        message: 'Pagination start with number 1',
      });
    } else if (name) {
      const nameDriver = this.findOne(name);
      const nameDriverPaginated = (await nameDriver).slice(
        (page - 1) * limit,
        page * limit,
      );
      return nameDriverPaginated;
    } else {
      const pagination = await this.database
        .getDrivers()
        .slice((page - 1) * limit, page * limit);
      return pagination;
    }
  }

  // Buscar motoristas por nome
  public async findOne(name: string) {
    const driver = await this.database
      .getDrivers()
      .filter((driver) =>
        driver.name.toUpperCase().includes(name.toUpperCase()),
      );

    if (driver.length <= 0) {
      throw new NotFoundException({
        statusCode: 404,
        message: 'Users not found',
      });
    } else {
      return driver;
    }
  }

  // Buscar motorista por CPF
  public findByCPF(cpf: string) {
    const driver = this.database
      .getDrivers()
      .find((driver) => driver.CPF === cpf);
    if (!driver) {
      throw new NotFoundException({
        statusCode: 404,
        message: 'Users not found',
      });
    } else {
      return driver;
    }
  }

  // Bloquear/Desbloquear Motorista
  public blockDriver(cpf: string) {
    this.findByCPF(cpf); // validar CPF
    const drivers = this.database.getDrivers();
    const listFiltred = drivers.map((driver) => {
      if (driver.CPF === cpf) {
        driver.blocked = driver.blocked != true;
      }
      return driver;
    });
    this.database.updateDriver(listFiltred);
    const driverFiltred = this.database
      .getDrivers()
      .find((driver) => driver.CPF === cpf);
    return { driverBlockStatus: driverFiltred.blocked };
  }

  // Deleter Motorista
  public remove(cpf: string) {
    this.findByCPF(cpf); // validar CPF
    const drivers = this.database
      .getDrivers()
      .filter((driver) => driver.CPF != cpf);

    this.database.deleteDriver(drivers);
    return {
      message: `User with CPF: ${cpf} has been deleted`,
    };
  }

  // Atualizar dados Motoristas
  public async updateDriver(driverBody, cpf) {
    this.findByCPF(cpf); // validar CPF
    const driverExist = await this.database
      .getDrivers()
      .find((drivers) => drivers.CPF === driverBody.CPF);
    const drivers = this.database.getDrivers();
    const updateDriver = drivers.map((driver) => {
      if (driver.CPF === cpf) {
        driver.name = driverBody.name || driver.name;
        driver.birth_date = driverBody.birth_date || driver.birth_date;
        driver.license_plate = driverBody.license_plate || driver.license_plate;
        driver.vehicle_model = driverBody.vehicle_model || driver.vehicle_model;
        driver.CPF = driverBody.CPF || driver.CPF;
        if (driverBody.CPF != cpf && driverExist) {
          throw new ConflictException({
            statusCode: 409,
            message: 'CPF already exists in the database',
          });
        }
      }
      return driver;
    });
    this.database.updateDriver(updateDriver);
    const filtredDriver = this.database
      .getDrivers()
      .find((driver) => driver.CPF === driverBody.CPF);
    return filtredDriver;
  }
}
