import { Module } from '@nestjs/common';
import { TripsService } from './trips.service';
import { TripsController } from './trips.controller';
import { Database } from 'src/database/database';

@Module({
  controllers: [TripsController],
  providers: [TripsService, Database],
})
export class TripsModule {}
