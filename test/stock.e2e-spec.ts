import { Test } from '@nestjs/testing';
import { getDataSourceToken } from '@nestjs/typeorm';
import { AppModule } from 'src/app.module';
import { setNestApp } from 'src/main';
import { initializeTransactionalContext } from 'typeorm-transactional';

import type { INestApplication } from '@nestjs/common';
import type { DataSource } from 'typeorm';

describe('StockResolver (e2e)', () => {
  let app: INestApplication;

  let dataSource: DataSource;

  beforeAll(async () => {
    initializeTransactionalContext();

    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();

    setNestApp(app);

    await app.init();

    dataSource = module.get(getDataSourceToken());
  });

  afterAll(async () => {
    await dataSource.destroy();
    await app.close();
  });
});
