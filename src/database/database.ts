import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { Driver } from 'src/drivers/entities/driver.entity';

@Injectable()
export class Database {
  private FILENAME = 'src/database/drivers.json';

  // buscar motoristas arquivo
  public getDrivers(): Array<Driver> {
    const driversFile = fs.readFileSync(this.FILENAME, 'utf-8').toString();
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
      this.FILENAME,
      JSON.stringify([...this.getDrivers(), driver]),
    );
  }
}
