import { ConflictException, Injectable } from '@nestjs/common';
import { Database } from 'src/database/database';

import { Driver } from './entities/driver.entity';

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
  public async findAll(page, size) {
    return await this.database
      .getDrivers()
      .slice(page * size, page * size + size);
  }

  // Buscar usuário(s) por nome
  public findOne(id: string) {
    const user = this.database
      .getDrivers()
      .filter((driver) => driver.name.includes(id));
    return user;
  }

  // Buscar usuário por CPF
  public findByCPF(cpf: string) {
    const user = this.database
      .getDrivers()
      .find((driver) => driver.CPF === cpf);
    return user;
  }

  public update(id: number, Driver: Driver) {
    return `This action updates a #${id} driver`;
  }

  public remove(id: number) {
    return `This action removes a #${id} driver`;
  }
}
