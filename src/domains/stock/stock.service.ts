import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

import { CreateStockInput } from './dtos/create-stock/create-stock-input.dto';
import { StockEntity } from './stock.entity';

@Injectable()
export class StockService {
  constructor(@InjectDataSource() private dataSource: DataSource) {}

  async createStock(createStockDto: CreateStockInput): Promise<StockEntity> {
    const stock = await this.dataSource.transaction(async (manager) => {
      const stock = await manager.save(createStockDto.toEntity());
      return stock;
    });

    if (!stock) {
      throw new BadRequestException('재고 생성에 실패했습니다.');
    }

    return stock;
  }
}
