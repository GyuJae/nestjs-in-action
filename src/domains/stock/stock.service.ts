import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

import { CreateStockInput } from './dtos/create-stock/create-stock-input.dto';
import { FindManyStockByParkCodeInput } from './dtos/find-many-stock-by-park-code/find-many-stock-by-park-code-input.dto';
import { StockQueryRepository } from './stock-query.repository';
import { StockEntity } from './stock.entity';

@Injectable()
export class StockService {
  constructor(
    @InjectDataSource() private dataSource: DataSource,
    @Inject() private stockQueryRepository: StockQueryRepository,
  ) {}

  async createStock(dto: CreateStockInput): Promise<StockEntity> {
    const stock = await this.dataSource.transaction(async (manager) => {
      const stock = await manager.save(dto.toEntity());
      return stock;
    });

    if (!stock) {
      throw new BadRequestException('재고 생성에 실패했습니다.');
    }

    return stock;
  }

  async findOneStockByParkCode(dto: FindManyStockByParkCodeInput): Promise<StockEntity[]> {
    return await this.stockQueryRepository.findManyByParkCode(dto.parkCode);
  }
}
