import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { StockQueryRepository } from './stock-query.repository';
import { StockEntity } from './stock.entity';
import { StockResolver } from './stock.resolver';
import { StockService } from './stock.service';

@Module({
  imports: [TypeOrmModule.forFeature([StockEntity])],
  providers: [StockQueryRepository, StockResolver, StockService],
})
export class StockModule {}
