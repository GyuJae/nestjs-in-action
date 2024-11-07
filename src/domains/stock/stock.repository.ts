import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { StockEntity } from './stock.entity';

@Injectable()
export class StockRepository extends Repository<StockEntity> {
  constructor(@InjectRepository(StockEntity) private repository: Repository<StockEntity>) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
