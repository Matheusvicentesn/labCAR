import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { Driver } from 'src/drivers/entities/driver.entity';

@Injectable()
export class Database {
  private FILENAMEDRIVER = 'src/database/drivers.json';
  private FILENAMEPASSENGER = 'src/database/passenger.json';

  // buscar motoristas arquivo
  public getDrivers(): Array<Driver> {
    const driversFile = fs
      .readFileSync(this.FILENAMEDRIVER, 'utf-8')
      .toString();
    const drivers = JSON.parse(driversFile);
    return drivers;
  }

  //  Salvar motorista no arquivo
  public writeDriver(driver: Driver) {
    let drivers = this.getDrivers();
    if (drivers) {
      drivers = [];
    }
    fs.writeFileSync(
      this.FILENAMEDRIVER,
      JSON.stringify([...this.getDrivers(), driver]),
    );
  }

  // Deletar Motorista
  public deleteDriver(driver: Driver[]) {
    fs.writeFileSync(this.FILENAMEDRIVER, JSON.stringify(driver));
  }

  // Atualizar Motorista
  public updateDriver(driver: Driver[]) {
    fs.writeFileSync(this.FILENAMEDRIVER, JSON.stringify(driver));
  }

  // Passenger

  // buscar passageiro arquivo
  public getPassengers(): Array<Driver> {
    const driversFile = fs
      .readFileSync(this.FILENAMEPASSENGER, 'utf-8')
      .toString();
    const drivers = JSON.parse(driversFile);
    return drivers;
  }

  //  Salvar passageiro no arquivo
  public writePassengers(driver: Driver) {
    let drivers = this.getPassengers();
    if (drivers) {
      drivers = [];
    }
    fs.writeFileSync(
      this.FILENAMEPASSENGER,
      JSON.stringify([...this.getPassengers(), driver]),
    );
  }

  // Deletar passageiro
  public deletePassengers(driver: Driver[]) {
    fs.writeFileSync(this.FILENAMEPASSENGER, JSON.stringify(driver));
  }

  // Atualizar passageiro
  public updatePassengers(driver: Driver[]) {
    fs.writeFileSync(this.FILENAMEPASSENGER, JSON.stringify(driver));
  }
}
