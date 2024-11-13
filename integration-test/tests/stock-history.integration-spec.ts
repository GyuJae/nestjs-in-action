import { Test } from '@nestjs/testing';
import { getDataSourceToken } from '@nestjs/typeorm';
import { AppModule } from 'src/app.module';
import { HistoryActionEnum } from 'src/domains/history/enums/history-action.enum';
import { HistoryEntityNameEnum } from 'src/domains/history/enums/history-entity-name.enum';
import { HistoryEntity } from 'src/domains/history/history.entity';
import { CreateStockInput } from 'src/domains/stock/dtos/create-stock/create-stock-input.dto';
import { StockService } from 'src/domains/stock/stock.service';
import { setNestApp } from 'src/main';
import { initializeTransactionalContext } from 'typeorm-transactional';

import type { INestApplication } from '@nestjs/common';
import type { DataSource } from 'typeorm';

describe('Stock Typeorm EventSubscriber', () => {
  let app: INestApplication;
  let dataSource: DataSource;
  let stockService: StockService;

  beforeAll(async () => {
    initializeTransactionalContext();
    process.env.APP_PORT = '8888';

    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();

    setNestApp(app);
    await app.init();

    dataSource = module.get(getDataSourceToken());
    stockService = module.get(StockService);
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(async () => {
    const entities = dataSource.entityMetadatas;
    for (const entity of entities) {
      const repository = dataSource.getRepository(entity.name);
      await repository.clear();
    }
  });

  it('재고 생성 시에 재고 생성 이력이 생성되어야 합니다.', async () => {
    // Given
    const input = new CreateStockInput();
    input.parkCode = 'parkCode';
    input.productCode = 'productCode';
    input.quantity = 10;

    // When
    const stock = await stockService.createStock(input);

    // Then
    const stockHistory = await dataSource.getRepository(HistoryEntity).findOne({
      where: {
        entityId: stock.id,
        entityName: HistoryEntityNameEnum.STOCK,
        action: HistoryActionEnum.CREATE,
      },
    });
    expect(stockHistory).toBeDefined();
  });
});
