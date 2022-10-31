import { Module } from '@nestjs/common';
import { DriversService } from './drivers.service';
import { DriversController } from './drivers.controller';
import { Database } from 'src/database/database';

@Module({
  controllers: [DriversController],
  providers: [DriversService, Database],
})
export class DriversModule {}
