import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { Driver } from 'src/drivers/entities/driver.entity';
import { Passenger } from 'src/passengers/entities/passenger.entity';
import { Trip } from 'src/trips/entities/trip.entity';

@Injectable()
export class Database {
  private FILENAMEDRIVER = 'src/database/drivers.json';
  private FILENAMEPASSENGER = 'src/database/passenger.json';
  private FILENAMETRIPS = 'src/database/trip.json';

  // DRIVERS

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
  // DRIVERS

  // Passenger

  // buscar passageiro arquivo
  public getPassengers(): Array<Passenger> {
    const passengerFile = fs
      .readFileSync(this.FILENAMEPASSENGER, 'utf-8')
      .toString();
    const passenger = JSON.parse(passengerFile);
    return passenger;
  }

  //  Salvar passageiro no arquivo
  public writePassengers(passenger: Passenger) {
    let passengers = this.getPassengers();
    if (passengers) {
      passengers = [];
    }
    fs.writeFileSync(
      this.FILENAMEPASSENGER,
      JSON.stringify([...this.getPassengers(), passenger]),
    );
  }

  // Deletar passageiro
  public deletePassengers(passenger: Passenger[]) {
    fs.writeFileSync(this.FILENAMEPASSENGER, JSON.stringify(passenger));
  }

  // Atualizar passageiro
  public updatePassengers(passenger: Passenger[]) {
    fs.writeFileSync(this.FILENAMEPASSENGER, JSON.stringify(passenger));
  }
  // Passenger

  // buscar passageiro arquivo
  public getTrips(): Array<Trip> {
    const tripsFile = fs.readFileSync(this.FILENAMETRIPS, 'utf-8').toString();
    const trip = JSON.parse(tripsFile);
    return trip;
  }

  //  Salvar passageiro no arquivo
  public writeTrip(trip: Trip) {
    let trips = this.getTrips();
    if (trips) {
      trips = [];
    }
    fs.writeFileSync(
      this.FILENAMETRIPS,
      JSON.stringify([...this.getTrips(), trip]),
    );
  }

  // Deletar passageiro
  public deleteTrip(trip: Trip[]) {
    fs.writeFileSync(this.FILENAMETRIPS, JSON.stringify(trip));
  }

  // Atualizar passageiro
  public updateTrip(trip: Trip[]) {
    fs.writeFileSync(this.FILENAMETRIPS, JSON.stringify(trip));
  }
}
