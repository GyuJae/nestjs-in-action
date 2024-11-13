import { Test } from '@nestjs/testing';
import { getDataSourceToken } from '@nestjs/typeorm';
import gql from 'graphql-tag';
import { AppModule } from 'src/app.module';
import { OutputStatusEnum } from 'src/common/enums/output-status.enum';
import { CreateStockInput } from 'src/domains/stock/dtos/create-stock/create-stock-input.dto';
import { FindManyStockByParkCodeInput } from 'src/domains/stock/dtos/find-many-stock-by-park-code/find-many-stock-by-park-code-input.dto';
import { StockService } from 'src/domains/stock/stock.service';
import { setNestApp } from 'src/main';
import request from 'supertest-graphql';
import { initializeTransactionalContext } from 'typeorm-transactional';

import type { INestApplication } from '@nestjs/common';
import type { CreateStockOutput } from 'src/domains/stock/dtos/create-stock/create-stock-output.dto';
import type { FindManyStockByParkCodeOutput } from 'src/domains/stock/dtos/find-many-stock-by-park-code/find-many-stock-by-park-code.dto';
import type { DataSource } from 'typeorm';

describe('StockResolver (e2e)', () => {
  let app: INestApplication;
  let dataSource: DataSource;
  let stockService: StockService;

  beforeAll(async () => {
    initializeTransactionalContext();

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

  async function createStockHelper(parkCode: string, productCode: string, quantity: number) {
    const input = new CreateStockInput();
    input.parkCode = parkCode;
    input.productCode = productCode;
    input.quantity = quantity;
    return await stockService.createStock(input);
  }

  it('createStock (Mutation)', async () => {
    // Given
    const input = new CreateStockInput();
    input.parkCode = 'parkCode';
    input.productCode = 'productCode';
    input.quantity = 10;

    // When
    const { data, errors } = await request<{ createStock: CreateStockOutput }, { input: CreateStockInput }>(app.getHttpServer())
      .mutate(gql`
        mutation CreateStock($input: CreateStockInput!) {
          createStock(input: $input) {
            status
            error
            stock {
              id
              parkCode
              productCode
              quantity
            }
          }
        }
      `)
      .variables({
        input,
      })
      .expectNoErrors();

    // Then
    expect(data?.createStock.status).toBe(OutputStatusEnum.SUCCESS);
    expect(data?.createStock.error).toBeNull();
    expect(data?.createStock.stock).toEqual({
      id: expect.any(Number),
      parkCode: input.parkCode,
      productCode: input.productCode,
      quantity: input.quantity,
    });
    expect(errors).toBeUndefined();
  });

  it('findManyStockByParkCode (Query)', async () => {
    await createStockHelper('parkCode1', 'productCode1', 10);
    await createStockHelper('parkCode2', 'productCode2', 20);

    const input = new FindManyStockByParkCodeInput();
    input.parkCode = 'parkCode1';

    // When
    const { data, errors } = await request<
      { findManyStockByParkCode: FindManyStockByParkCodeOutput },
      { input: FindManyStockByParkCodeInput }
    >(app.getHttpServer())
      .query(gql`
        query FindManyStockByParkCode($input: FindManyStockByParkCodeInput!) {
          findManyStockByParkCode(input: $input) {
            status
            error
            stocks {
              id
              parkCode
              productCode
              quantity
              updatedAt
              createdAt
              deletedAt
            }
          }
        }
      `)
      .variables({ input })
      .expectNoErrors();

    // Then
    expect(data?.findManyStockByParkCode.status).toBe(OutputStatusEnum.SUCCESS);
    expect(data?.findManyStockByParkCode.error).toBeNull();
    expect(data?.findManyStockByParkCode.stocks).toHaveLength(1);
    expect(data?.findManyStockByParkCode?.stocks?.[0]).toEqual({
      id: expect.any(Number),
      parkCode: 'parkCode1',
      productCode: 'productCode1',
      quantity: 10,
      updatedAt: expect.any(String),
      createdAt: expect.any(String),
      deletedAt: null,
    });
    expect(errors).toBeUndefined();
  });
});
