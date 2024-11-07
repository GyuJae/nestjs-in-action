import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { StockEntity } from './stock.entity';
import { StockRepository } from './stock.repository';
import { StockResolver } from './stock.resolver';
import { StockService } from './stock.service';

@Module({
  imports: [TypeOrmModule.forFeature([StockEntity])],
  providers: [StockRepository, StockResolver, StockService],
})
export class StockModule {}
