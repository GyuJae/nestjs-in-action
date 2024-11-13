import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { testTypeOrmOptions } from 'src/common/test-utils/config';

import { CreateHistoryDto } from './dtos/create-history.dto';
import { HistoryActionEnum } from './enums/history-action.enum';
import { HistoryEntityNameEnum } from './enums/history-entity-name.enum';
import { HistoryEntity } from './history.entity';
import { HistoryService } from './history.service';

import type { TestingModule } from '@nestjs/testing';

describe('HistoryService', () => {
  let historyService: HistoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(testTypeOrmOptions), TypeOrmModule.forFeature([HistoryEntity])],
      providers: [HistoryService],
    }).compile();

    historyService = module.get(HistoryService);
  });

  it('데이터 변경 이력을 생성 할 수 있습니다', async () => {
    // Given
    const dto = new CreateHistoryDto();
    dto.entityName = HistoryEntityNameEnum.STOCK;
    dto.entityId = 1;
    dto.action = HistoryActionEnum.CREATE;
    dto.entity = { quantity: 10, productCode: 'product-code', parkCode: 'park-code' };

    // When
    const history = await historyService.createHistory(dto);

    // Then
    expect(history).toBeDefined();
    expect(history.id).toBeDefined();
    expect(history.entityName).toBe(dto.entityName);
    expect(history.entityId).toBe(dto.entityId);
    expect(history.entity).toEqual(dto.entity);
    expect(history.action).toBe(dto.action);
  });
});
