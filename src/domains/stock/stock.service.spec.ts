import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { testTypeOrmOptions } from 'src/common/test-utils/config';

import { CreateStockInput } from './dtos/create-stock/create-stock-input.dto';
import { StockQueryRepository } from './stock-query.repository';
import { StockEntity } from './stock.entity';
import { StockService } from './stock.service';

import type { TestingModule } from '@nestjs/testing';

describe('StockService', () => {
  let stockService: StockService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(testTypeOrmOptions), TypeOrmModule.forFeature([StockEntity])],
      providers: [StockQueryRepository, StockService],
    }).compile();

    stockService = module.get(StockService);
  });

  it('재고를 생성 할 수 있습니다', async () => {
    // Given
    const dto = new CreateStockInput();
    dto.quantity = 10;
    dto.productCode = 'product-code';
    dto.parkCode = 'park-code';

    // When
    const stock = await stockService.createStock(dto);

    // Then
    expect(stock).toBeDefined();
    expect(stock.id).toBeDefined();
    expect(stock.quantity).toBe(dto.quantity);
    expect(stock.productCode).toBe(dto.productCode);
    expect(stock.parkCode).toBe(dto.parkCode);
  });

  it('지점 코드를 통해 전체 재고를 조회 할 수 있습니다', async () => {
    // Given
    const dto = new CreateStockInput();
    dto.quantity = 10;
    dto.productCode = 'product-code';
    dto.parkCode = 'park-code';

    await stockService.createStock(dto);
    await stockService.createStock(dto);
    await stockService.createStock(dto);

    const dto2 = new CreateStockInput();
    dto2.quantity = 20;
    dto2.productCode = 'product-code2';
    dto2.parkCode = 'park-code2';

    await stockService.createStock(dto2);

    // When
    const stocks = await stockService.findOneStockByParkCode({ parkCode: dto.parkCode });

    // Then
    expect(stocks).toBeDefined();
    expect(stocks.length).toBe(3);
    expect(stocks[0].quantity).toBe(dto.quantity);
    expect(stocks[0].productCode).toBe(dto.productCode);
    expect(stocks[0].parkCode).toBe(dto.parkCode);
  });
});
