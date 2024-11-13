import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { HistoryEntity } from './history.entity';
import { HistoryService } from './history.service';
import { StockHistorySubscriber } from './subscribers/stock-history.subscriber';

@Module({
  imports: [TypeOrmModule.forFeature([HistoryEntity])],
  providers: [HistoryService, StockHistorySubscriber],
})
export class HistoryModule {}
