import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { StockEntity } from './stock.entity';

@Injectable()
export class StockQueryRepository extends Repository<StockEntity> {
  constructor(@InjectRepository(StockEntity) private repository: Repository<StockEntity>) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  async findManyByParkCode(parkCode: string): Promise<StockEntity[]> {
    return this.createQueryBuilder('stock').select().where('stock.parkCode = :parkCode', { parkCode }).getMany();
  }
}
