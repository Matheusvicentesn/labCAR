import { Module } from '@nestjs/common';
import { PassengersService } from './passengers.service';
import { PassengersController } from './passengers.controller';
import { Database } from 'src/database/database';

@Module({
  controllers: [PassengersController],
  providers: [PassengersService, Database],
})
export class PassengersModule {}
