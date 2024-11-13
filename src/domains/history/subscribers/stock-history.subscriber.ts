import { InjectDataSource } from '@nestjs/typeorm';
import { StockEntity } from 'src/domains/stock/stock.entity';
import { DataSource, EventSubscriber } from 'typeorm';

import { AbstractHistorySubscriber } from './abstract-history.subscriber';
import { HistoryEntityNameEnum } from '../enums/history-entity-name.enum';
import { HistoryService } from '../history.service';

@EventSubscriber()
export class StockHistorySubscriber extends AbstractHistorySubscriber<StockEntity> {
  constructor(
    @InjectDataSource() private readonly dataSource: DataSource,
    historyService: HistoryService,
  ) {
    super(dataSource, historyService, HistoryEntityNameEnum.STOCK);
  }

  listenTo(): typeof StockEntity {
    return StockEntity;
  }
}
