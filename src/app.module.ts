import { Module } from '@nestjs/common';
import { Database } from './database/database';
import { DriversModule } from './drivers/drivers.module';
import { PassengersModule } from './passengers/passengers.module';
import { TripsModule } from './trips/trips.module';

@Module({
  imports: [DriversModule, PassengersModule, TripsModule],
  controllers: [],
  providers: [Database],
})
export class AppModule {}
