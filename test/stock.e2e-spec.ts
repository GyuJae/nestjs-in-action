import { Test } from '@nestjs/testing';
import gql from 'graphql-tag';
import { AppModule } from 'src/app.module';
import { OutputStatusEnum } from 'src/common/enums/output-status.enum';
import { CreateStockInput } from 'src/domains/stock/dtos/create-stock/create-stock-input.dto';
import { setNestApp } from 'src/main';
import request from 'supertest-graphql';
import { initializeTransactionalContext } from 'typeorm-transactional';

import type { INestApplication } from '@nestjs/common';
import type { CreateStockOutput } from 'src/domains/stock/dtos/create-stock/create-stock-output.dto';

describe('StockResolver (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    initializeTransactionalContext();

    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();

    setNestApp(app);

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

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
});
