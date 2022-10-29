import { Injectable } from '@nestjs/common';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { Driver } from './entities/driver.entity';

@Injectable()
export class DriversService {
  private readonly drivers: Array<Driver> = [];

  public create(createDriverDto: CreateDriverDto): Driver {
    createDriverDto.blocked = false;
    this.drivers.push(createDriverDto);
    return createDriverDto;
  }

  public findAll(): Driver[] {
    return this.drivers;
  }

  public findOne(id: number) {
    return `This action returns a #${id} driver`;
  }

  public update(id: number, updateDriverDto: UpdateDriverDto) {
    return `This action updates a #${id} driver`;
  }

  public remove(id: number) {
    return `This action removes a #${id} driver`;
  }
}
