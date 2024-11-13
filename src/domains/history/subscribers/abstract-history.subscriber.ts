/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import { Inject } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { CommonEntity } from 'src/common/entities/common.entity';
import { DataSource } from 'typeorm';

import { CreateHistoryDto } from '../dtos/create-history.dto';
import { HistoryActionEnum } from '../enums/history-action.enum';
import { HistoryEntityNameEnum } from '../enums/history-entity-name.enum';
import { HistoryService } from '../history.service';

import type {
  EntitySubscriberInterface,
  InsertEvent,
  ObjectLiteral,
  RecoverEvent,
  RemoveEvent,
  SoftRemoveEvent,
  UpdateEvent,
} from 'typeorm';

export abstract class AbstractHistorySubscriber<T extends CommonEntity> implements EntitySubscriberInterface<T> {
  constructor(
    @InjectDataSource() dataSource: DataSource,
    @Inject() private readonly historyService: HistoryService,
    private readonly entityName: HistoryEntityNameEnum,
  ) {
    dataSource.subscribers.push(this);
  }

  abstract listenTo(): Function | string;

  async afterInsert({ entity }: InsertEvent<T>): Promise<void> {
    await this.saveHistory(HistoryActionEnum.CREATE, entity);
  }
  async afterUpdate({ entity }: UpdateEvent<T>): Promise<void> {
    if (!entity) return;
    await this.saveHistory(HistoryActionEnum.UPDATE, entity);
  }
  async afterRemove({ databaseEntity }: RemoveEvent<T>): Promise<void> {
    await this.saveHistory(HistoryActionEnum.DELETE, databaseEntity);
  }
  async afterSoftRemove({ databaseEntity }: SoftRemoveEvent<T>): Promise<void> {
    if (!databaseEntity) return;
    await this.saveHistory(HistoryActionEnum.SOFT_DELETE, databaseEntity);
  }
  async afterRecover({ entity }: RecoverEvent<T>): Promise<void> {
    if (!entity) return;
    await this.saveHistory(HistoryActionEnum.RECOVER, entity);
  }
  private async saveHistory(action: HistoryActionEnum, entity: T | ObjectLiteral): Promise<void> {
    const dto = new CreateHistoryDto();
    dto.entityId = entity.id;
    dto.entityName = this.entityName;
    dto.action = action;
    dto.entity = entity;

    // TODO LOG Try catch
    await this.historyService.createHistory(dto);
  }
}
