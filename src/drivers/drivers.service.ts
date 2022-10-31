import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Database } from 'src/database/database';

import { Block, Driver } from './entities/driver.entity';

@Injectable()
export class DriversService {
  private readonly drivers: Array<Driver> = [];

  constructor(private database: Database) {}

  // Cadastar usuário
  public async create(driver: Driver): Promise<Driver> {
    const driverExist = await this.findByCPF(driver.CPF);
    if (driverExist) {
      throw new ConflictException({
        statusCode: 409,
        message: 'CPF already exists in the database',
      });
    }
    driver.blocked = false;
    this.database.writeDriver(driver);
    return driver;
  }

  // Buscar todos usuários no ARRAY
  public async findAll(page, limit) {
    return await this.database
      .getDrivers()
      .slice(page * limit, page * limit + limit);
  }

  // Buscar usuário(s) por nome
  public async findOne(id: string) {
    const user = await this.database
      .getDrivers()
      .filter((driver) => driver.name.includes(id));

    if (user.length <= 0) {
      console.log(user);
      throw new NotFoundException({
        statusCode: 404,
        message: 'Users not found',
      });
    } else {
      return user;
    }
  }

  // Buscar usuário por CPF
  public findByCPF(cpf: string) {
    const user = this.database
      .getDrivers()
      .find((driver) => driver.CPF === cpf);
    return user;
  }

  public blockDriver(cpf: string) {
    const user = this.database.getDrivers();
    const nova = user.map((driver) => {
      if (driver.CPF === cpf) {
        driver.blocked = driver.blocked != true;
      }
      return driver;
    });
    this.database.updateDriver(nova);
    const userFilter = this.database
      .getDrivers()
      .find((driver) => driver.CPF === cpf);
    return userFilter;
  }

  public remove(cpf: string) {
    const users = this.database
      .getDrivers()
      .filter((driver) => driver.CPF != cpf);

    this.database.deleteDriver(users);
    return users;
  }

  public updateDriver(driverBody, cpf) {
    const drivers = this.database.getDrivers();

    const updateDriver = drivers.map((driver) => {
      if (driver.CPF === cpf) {
        driver.name = driverBody.name || driver.name;
        driver.birth_date = driverBody.birth_date || driver.birth_date;
        driver.CPF = driverBody.CPF || driver.CPF;
        driver.license_plate = driverBody.license_plate || driver.license_plate;
        driver.vehicle_model = driverBody.vehicle_model || driver.vehicle_model;
        // driver.blocked = driverBody.blocked || driver.blocked;
      }
      return driver;
    });
    this.database.updateDriver(updateDriver);
    const userFilter = this.database
      .getDrivers()
      .find((driver) => driver.CPF === cpf);
    return userFilter;
  }
}
