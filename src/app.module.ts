import { Module } from '@nestjs/common';
import { Database } from './database/database';
import { DriversModule } from './drivers/drivers.module';
import { PassengersModule } from './passengers/passengers.module';

@Module({
  imports: [DriversModule, PassengersModule],
  controllers: [],
  providers: [Database],
})
export class AppModule {}
