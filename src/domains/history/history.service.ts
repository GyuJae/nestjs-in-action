import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

import { CreateHistoryDto } from './dtos/create-history.dto';
import { HistoryEntity } from './history.entity';

@Injectable()
export class HistoryService {
  constructor(@InjectDataSource() private dataSource: DataSource) {}

  async createHistory(dto: CreateHistoryDto): Promise<HistoryEntity> {
    const history = await this.dataSource.transaction(async (manager) => {
      const history = await manager.save(dto.toEntity());
      return history;
    });

    if (!history) {
      throw new BadRequestException('Entity 기록 생성에 실패했습니다.');
    }

    return history;
  }
}
