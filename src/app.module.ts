import { Module } from '@nestjs/common';
import { Database } from './database/database';
import { DriversModule } from './drivers/drivers.module';

@Module({
  imports: [DriversModule],
  controllers: [],
  providers: [Database],
})
export class AppModule {}
