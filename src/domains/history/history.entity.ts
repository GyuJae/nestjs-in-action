import { CommonEntity } from 'src/common/entities/common.entity';
import { Column, Entity } from 'typeorm';

import { HistoryActionEnum } from './enums/history-action.enum';
import { HistoryEntityNameEnum } from './enums/history-entity-name.enum';

@Entity('histories')
export class HistoryEntity extends CommonEntity {
  @Column({ type: 'text' })
  entityName: HistoryEntityNameEnum;

  @Column({ type: 'numeric' })
  entityId: number;

  @Column({ type: 'text' })
  action: HistoryActionEnum;

  @Column({ type: 'json' })
  entity: object;

  static from({
    entityName,
    entityId,
    action,
    entity,
  }: {
    entityName: HistoryEntityNameEnum;
    entityId: number;
    action: HistoryActionEnum;
    entity: object;
  }): HistoryEntity {
    const history = new HistoryEntity();
    history.entityName = entityName;
    history.entityId = entityId;
    history.action = action;
    history.entity = entity;
    return history;
  }
}
